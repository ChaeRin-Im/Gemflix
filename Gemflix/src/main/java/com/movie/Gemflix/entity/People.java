package com.movie.Gemflix.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Data
@Table(name = "PEOPLE")
@SequenceGenerator(
        name = "PE_ID_SEQ_GEN",
        sequenceName = "PE_ID_SEQ",
        initialValue = 1,
        allocationSize = 1
)
public class People {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "PE_ID_SEQ_GEN")
    @Column(name = "PE_ID")
    private Long peId;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "NATIONALITY")
    private String nationality;

    @Column(name = "BIRTH")
    private Date birth;

    @Column(name = "API_ID")
    private String apiId;
}
