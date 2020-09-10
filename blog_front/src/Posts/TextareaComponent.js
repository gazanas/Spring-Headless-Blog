import React, { Component } from "react";
import ReactQuill from "react-quill";

import 'react-quill/dist/quill.snow.css'

import { Form } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'js-cookie'

const ATTRIBUTES = ['height', 'width'];
const BlockEmbed = ReactQuill.Quill.import("blots/block/embed");
const Link = ReactQuill.Quill.import("formats/link");
class VideoBlot extends BlockEmbed {
    static create(value) {
        const node = super.create(value);
        node.classList.add("embed-responsive-16by9");

        const child =  document.createElement("iframe");
        child.setAttribute('frameborder', '0');
        child.setAttribute('allowfullscreen', true);
        child.setAttribute('src', this.sanitize(value));
        child.classList.add("ql-video");

        node.appendChild(child);
        return node;
    }
    
      static formats(domNode) {
        return ATTRIBUTES.reduce((formats, attribute) => {
          if (domNode.hasAttribute(attribute)) {
            formats[attribute] = domNode.getAttribute(attribute);
          }
          return formats;
        }, {});
      }
    
      static sanitize(url) {
        return Link.sanitize(url); // eslint-disable-line import/no-named-as-default-member
      }
    
      static value(domNode) {
        const iframe = domNode.querySelector('iframe');
        return iframe.getAttribute('src');
    }
    
      format(name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name);
          }
        } else {
          super.format(name, value);
        }
      }
    
      html() {
        const { video } = this.value();
        return `<a href="${video}">${video}</a>`;
      }
}
VideoBlot.blotName = 'video'
VideoBlot.tagName = 'div'
VideoBlot.className = 'embed-responsive'
ReactQuill.Quill.register({'formats/video': VideoBlot})

let Image = ReactQuill.Quill.import('formats/image')
class ImageBlot extends Image {
}
ImageBlot.blotName = 'imageBlot'
ImageBlot.tagName = 'img'
ImageBlot.className = 'img-fluid'
ReactQuill.Quill.register('formats/imageBlot', ImageBlot)

class TextareaComponent extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        
        this.state = {text: ''}

        this.imageHandler = this.imageHandler.bind(this)

        this.modules = {
            toolbar: {
                container: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                    {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
                handlers: {
                    'image': this.imageHandler
                }
            },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            }
        }

        this.formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'imageBlot', 'video'
        ]

        this.quill = null;
    }

    imageHandler() {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('image', file)

            const range = this.quill.getEditor().getSelection(true)

            this.quill.getEditor().insertEmbed(range.index, 'imageBlot', `${ window.location.origin }/images/loaders/placeholder.gif`); 

            this.quill.getEditor().setSelection(range.index + 1);

            if (file['type'].split('/')[0] === 'image') {
                axios({
                    url: 'http://localhost:8080/post/image',
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Authorization': Cookies.get('Authorization')
                    },
                    withCredentials: true
                }).then(response => {
                    this.quill.getEditor().deleteText(range.index, 1);
                    this.quill.getEditor().insertEmbed(range.index, 'imageBlot', 'http://localhost:8080/uploads/static/images/articles/'+response.data); 
                }).catch(error => console.log(error.response.data))
            } else {
                console.log('Not an image file')
            }
        }
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        return (
          <Form.Group className='col-12'>
            <ReactQuill ref={(el) => { this.quill = el }}
                          theme='snow'
                          onChange={this.handleChange}
                          value={this.state.text}
                          modules={this.modules}
                          formats={this.formats}
                          bounds={'.app'}
                          placeholder='Write an article...' />
            <input type='hidden' name='body' value={this.state.text} />
          </Form.Group>
        )
    }
}

export default TextareaComponent