<template>
  <div>
    <Grid ref="prmGrid" name="prmGrid" class="grid" height="300"></Grid>
  </div>
</template>

<script>
import Grid from "@/components/Grid";
import {ProductGridHeader, ProductGridOpt} from "./ProductGrid";
import ProductDetail from "@/views/ProductDetail";

let prmGrid;

export default {
  name: "Product",
  components: {ProductDetail, Grid},
  data() {
    return {
      name: "22222",
    }
  },
  mounted() {
    const _self = this;
    prmGrid = _self.$refs.prmGrid;
    prmGrid.createGrid(ProductGridHeader, ProductGridOpt(_self));
  },
  created() {
    const _self = this;
    const param = {
      params: {
        prdNo: 0
      }
    }
    _self.$axios.get("http://localhost:8095/prd/product", param)
        .then((result) => {
          if (result.data && result.data.length > 0) {
            const data = result.data
            prmGrid.setGridData(data);
          }
        });
  },
}
</script>

<style scoped>

</style>