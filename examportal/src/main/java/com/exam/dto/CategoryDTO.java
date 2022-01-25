package com.exam.dto;

import javax.persistence.Column;
import java.io.Serializable;

public class CategoryDTO  implements Serializable {
    private Long cId;

    private String title;

    private String description;

    public Long getcId() {
        return cId;
    }

    public void setcId(Long cId) {
        this.cId = cId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
