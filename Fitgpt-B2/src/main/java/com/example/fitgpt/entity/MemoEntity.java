package com.example.fitgpt.entity;

import com.example.fitgpt.dto.MemoDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "memo_table")
public class MemoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String date;

    @Column
    private String content;

    public static MemoEntity toMemoEntity(MemoDTO memoDTO) {
        MemoEntity memoEntity = new MemoEntity();
        memoEntity.setUserId(memoDTO.getUserId());
        memoEntity.setDate(memoDTO.getDate());
        memoEntity.setContent(memoDTO.getContent());
        return memoEntity;
    }

    public static MemoEntity toUpdateMemoEntity(MemoDTO memoDTO) {
        MemoEntity memoEntity = new MemoEntity();
        memoEntity.setId(memoDTO.getUserId());
        memoEntity.setUserId(memoDTO.getUserId());
        memoEntity.setDate(memoDTO.getDate());
        memoEntity.setContent(memoDTO.getContent());
        return memoEntity;
    }
}
