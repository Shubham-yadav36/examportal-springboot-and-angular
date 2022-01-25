package com.exam.dto;

import java.util.List;

public class PageResponse<T> {
    private T data;
    private Integer totalPage;

    public PageResponse() {
    }

    public PageResponse(T data, Integer totalPage) {
        this.data = data;
        this.totalPage = totalPage;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }
}
