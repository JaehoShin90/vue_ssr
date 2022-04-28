<template>
  <div>
    <p>{{ prdData.prdNo }}</p>
    <p>{{ prdData.prdNm }}</p>
    <p>{{ prdData.cateNm }}</p>
    <p>{{ prdData.metaNm }}</p>
    <button @click="test">test</button>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      prdData: {
        prdNo: "",
        prdNm: "",
        brdNm: "",
        cateIdx: "",
        cateNm: "",
        level: "",
        metaNm: "",
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
    const _self = this;
    try {
      // 서버에서 전달받은 데이터로 초기화
      _self.prdData = _self.$store.state.ssrRenderData;
      console.log(_self.prdData)
      // store의 ssrRenderData 초기화
      _self.$store.commit('SET_SSR_RENDER_DATA', {});
      // 만약 서버에서 받은 데이터가 없으면 API 호출
      if(_self.prdData.prdNo == undefined) {
        const prdNo = _self.$route.query.prdNo ? _self.$route.query.prdNo : 1;
        const param = {
          params: {
            prdNo: prdNo
          }
        }
        _self.$axios.get("http://localhost:8095/prd/product", param)
            .then((result) => {
              if (result.data && result.data.length > 0) {
                const data = result.data
                _self.prdData = data[0];
              }
            });
      }
    } catch (e) {
      console.log(e);
    }
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  methods:{
    test(){
      alert('ass');
    }
  }
}
</script>

<style scoped>

</style>