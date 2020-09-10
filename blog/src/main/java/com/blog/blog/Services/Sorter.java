package com.blog.blog.Services;

public enum Sorter {
    asc("id"),
    desc("id");

    private String field;

    Sorter(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }
}
