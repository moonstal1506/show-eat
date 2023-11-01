package com.ssafy.showeat.domain.elasticSearch;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.Id;

@Setter
@Getter
@Document(indexName = "showeat")
public class SearchDocument {
    @Id
    private Long id;

    @Field(type = FieldType.Text)
    private String menuName;

    public SearchDocument(Long id, String menuName){
        this.id = id;
        this.menuName = menuName;
    }
}
