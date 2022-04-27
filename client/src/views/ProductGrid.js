export const ProductGridOpt = (vm) => {
    return {
        isUsePaging: false
        , isDisplayNo: false
        , isFixHeader: true
    }
}

export const ProductGridHeader = [
    {
        columnId: "prdNo"
        , columnNm: "상품번호"
        , dataType: "integer"
        , align: "center"
        , size: 100
        , isATag: true
        , aTagHref: '/ProductDtl'
    }, {
        columnId: "prdNm"
        , columnNm: "상품명"
        , dataType: "string"
        , align: "left"
        , size: 100
    }, {
        columnId: "brdNm"
        , columnNm: "브랜드명"
        , dataType: "string"
        , align: "left"
        , size: 100
    }, {
        columnId: "cateIdx"
        , columnNm: "카테고리번호"
        , dataType: "string"
        , align: "left"
        , size: 100
    }, {
        columnId: "cateNm"
        , columnNm: "카테고리명"
        , dataType: "string"
        , align: "left"
        , size: 100
    }, {
        columnId: "level"
        , columnNm: "카테고리레벨"
        , dataType: "string"
        , align: "left"
        , size: 100
    }, {
        columnId: "metaNm"
        , columnNm: "메타태그내용"
        , dataType: "string"
        , align: "left"
        , size: 100
    }
]