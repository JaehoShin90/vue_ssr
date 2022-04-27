<template>
  <div class="grid_container" :style="{height: height + 'px'}">
    <table>
      <thead>
      <tr>
        <th v-if="isDisplayNo" class="tblNo"
            :class="{'fixedHeader':isFixHeader}"
        >
          No.
        </th>
        <th v-for="th in header"
            :key="th.columnId"
            :class="['center', {'fixedHeader':isFixHeader}]"
            :style="{width:th.size + 'px'}"
        >
          {{ th.columnNm }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(val, idx) in dataList"
          :id="'tr_' + idx"
          :key="idx"
          :class="{'isClickable':isClickable}"
          @click="clickRow(val, $event)"
      >
        <td v-if="isDisplayNo" class="tblNo">
          {{ idx + 1 }}
        </td>
        <td v-for="(hd, idx2) in header"
            :class="[hd.align]"
            :key="idx + '_' + idx2"
        >
          <p v-if="hd.isATag === false || hd.aTagHref == ''">{{ setTableData(hd, val) }}</p>
          <a v-else-if="hd.isATag === true && hd.aTagHref != ''"
             v-bind:href="hd.aTagHref + '?prdNo=' + val[hd.columnId]">{{val[hd.columnId]}}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Grid"
  , props: {
    height: String,
  }
  , data() {
    return {
      dataList: []
      , header: []
      , isUsePaging: false
      , isDisplayNo: false
      , isFixHeader: false
      , isClickable: false
      , rowClckFunction: null
      , selectedRow: null
    }
  }
  , methods: {
    getDefaultValue(column) {
      if (column === "align") {
        return "left";
      } else if (column === "size") {
        return 100;
      } else if (column === "dateFormat") {
        return "yyyy-MM-dd hh:mm:ss";
      } else {
        return "";
      }
    }
    , log(type, msg) {
      if (type === "e") {
        console.log("[Grid Error !!!] " + msg)
      } else {
        console.log("[Grid] " + msg);
      }
    }
    , validHeader(header) {
      const _self = this;
      let valid = header;
      valid.forEach(function (item, idx, arr) {
        /*
        * columnId : 컬럼 ID
        * columnNm : 컬럼 노출 명
        * dataType : 데이터 타입(string, date, int)
        * align : 항목 정렬 방법(left, center, right)
        * size : 컬럼 width
        * isUseSort : 컬럼 클릭 정렬 사용 여부(현재 미구현)
        * isSetComma : 데이터 타입이 숫자일 경우 콤마 표시 여부
        * dateFormat : 데이터 타입이 date일 경우 설정한 포맷으로 노출(yyyy, MM, dd, hh, mm, ss, SS)
        * prefix : 컬럼 데이터 앞에 표시 할 문자(ex: prefix : "D", data : "-7", 실제노출 : "D-7")
        * postfix : 컬럼 데이터 끝에 표시 할 문자(ex: prefix : " 원", data : 1000, 실제노출 : "1000 원")
        * isATag : a tag 여부
        * aTagHref : a tag href
        * displayFunction : 기본 함수 외에 사용자가 설정한 함수대로 데이터를 출력한다.
        * */
        let opt = {
          columnId: item.columnId
          , columnNm: item.columnNm
          , dataType: item.dataType
          , align: (item.align === undefined ? _self.getDefaultValue("align") : item.align.toLowerCase())
          , size: (item.size === undefined ? _self.getDefaultValue("size") : item.size)
          , isUseSort: (item.isUseSort === undefined ? true : item.isUseSort)
          , isSetComma: (item.isSetComma === undefined ? false : item.isSetComma)
          , dateFormat: (item.dateFormat === undefined ? "" : item.dateFormat)
          , prefix: (item.prefix === undefined ? "" : item.prefix)
          , postfix: (item.postfix === undefined ? "" : item.postfix)
          , displayFunction: (item.displayFunction instanceof Function ? item.displayFunction : null)
          , isATag: (item.isATag === undefined ? false : item.isATag)
          , aTagHref: (item.aTagHref === undefined ? "" : item.aTagHref)
        };
        if (opt.isSetComma === true && opt.dataType != "int") {
          item.isSetComma = false;
          _self.log("e", "isSetComma는 dataType을 int로 설정해야합니다.");
        }
        if (opt.dateFormat != "" && opt.dataType != "date") {
          item.dateFormat = "";
          _self.log("e", "dateFormat는 dataType을 date로 설정해야합니다.");
        }
        if (opt.dataType === "date" && opt.dateFormat === "") {
          opt.dateFormat = _self.getDefaultValue("dateFormat");
        }
        arr[idx] = opt;
      });
      return valid;
    }
    , createGrid(header, gridOpt) {
      const _self = this;
      if (gridOpt) {
        if (gridOpt.isUsePaging && gridOpt.isUsePaging) {
          _self.isUsePaging = true;
        }
        if (gridOpt.isDisplayNo && gridOpt.isDisplayNo) {
          _self.isDisplayNo = true;
        }
        if (gridOpt.isFixHeader && gridOpt.isFixHeader) {
          _self.isFixHeader = true;
        }
        if (gridOpt.rowClckFunction && gridOpt.rowClckFunction instanceof Function) {
          _self.isClickable = true;
          _self.rowClckFunction = gridOpt.rowClckFunction;
        }
      }
      if (header === null) {
        _self.log('e', 'Grid Header를 설정하여 주십시오.');
        return false;
      }
      _self.header = _self.validHeader(header);
    }
    , setGridData(data) {
      const _self = this;
      _self.dataList = data;
    }
    , setTableData(col, data) {
      const _self = this;
      let result = data[col.columnId];

      /* 숫자 comma 표시 */
      if (col.isSetComma) {
        result = _self.setComma(result);
      }
      /* 날짜 형식 설정 */
      if (col.dateFormat != "") {
        result = _self.setDateFormat(result, col.dateFormat);
      }

      /* prefix & postfix*/
      result = col.prefix + result + col.postfix;
      if (col.displayFunction != null) {
        return col.displayFunction(result);
      } else {
        return result;
      }
    }
    , setComma(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    , setDateFormat(data, format) {
      const now = new Date(data);
      const year = now.getFullYear();
      const month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
      const date = (now.getDate() + 1 < 10 ? '0' : '') + now.getDate();
      const hour = (now.getHours() + 1 < 10 ? '0' : '') + now.getHours();
      const minute = (now.getMinutes() + 1 < 10 ? '0' : '') + now.getMinutes();
      const second = (now.getSeconds() + 1 < 10 ? '0' : '') + now.getSeconds();
      const milli = now.getMilliseconds();
      return format.replace("yyyy", year)
          .replace("MM", month)
          .replace("dd", date)
          .replace("hh", hour)
          .replace("mm", minute)
          .replace("ss", second)
          .replace("mil", milli);
    }
    , clickRow(data, event) {
      const _self = this;
      if (_self.rowClckFunction != null) {
        if (_self.selectedRow != null) {
          _self.selectedRow.classList.remove('selectedRow');
        }
        _self.selectedRow = event.target.parentNode;
        _self.selectedRow.setAttribute('class', 'selectedRow');
        _self.rowClckFunction(data);
      }
    }
  }
}
</script>

<style scoped>
.grid_container {
  overflow: auto;
  border: 1px solid #a7a7a7;
  width: 100%;
}

.fixedHeader {
  position: sticky;
  top: 0;
}

.tblNo {
  text-align: center;
  width: 50px;
  max-width: 50px;
}


.center {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

table {
  /*border-top: 1px solid white;*/
  border-collapse: collapse;
  table-layout: fixed;
  word-break: break-all
}

th {
  background-color: #30aaaf;
  color: white;
  min-width: 50px;
}

th, td {
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  padding: 5px;
}

th:first-child, td:first-child {
  border-left: none;
}

tbody > tr:nth-child(even) {
  background-color: #d2e5e6;
}

.isClickable:hover {
  background-color: #84d1d5;
  cursor: pointer;
}

.selectedRow {
  background-color: #84d1d5 !important;
}

</style>