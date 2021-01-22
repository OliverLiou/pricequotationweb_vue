<template>
  <div id="app">
    <b-tabs content-class="mt-3">
      <b-tab title="【Bom續頁】" active><p>I'm the first tab</p></b-tab>
      <b-tab title="【量/檢具】"><p>I'm the second tab</p></b-tab>
      <b-tab title="【夾/治具及設備】"><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import * as api from "../api/Bom";
export default {
  name: "app",
  data() {
    return {
      BomDetail: null,
      BomItemColumn: [
        {
          key: "No",
          label: "編號",
          sortable: true,
        },
      ],
      MeasuringItemColumn: [],
      FixtureItemColumn: [],
    };
  },
  mounted() {
    this.GetBomDetail('Test-53510-BZ100');
  },
  methods: {
    async GetBomDetail(params) {
      console.log(params)
      const self = this;
      await api.GetBomDetail.r(params)
        .then((res) => {
          console.log(res)
          self.BomDetail = res.data;
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
  },
};
</script>