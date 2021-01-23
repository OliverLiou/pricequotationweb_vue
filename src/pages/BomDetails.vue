<template>
  <div id="app">
    <b-tabs content-class="mt-3">
      <b-tab title="【Bom續頁】">
        <p>I'm the first tab</p>
        <b-table :items="BomDetail" :fields="BomItemColumn">
        </b-table>
      </b-tab>

      <b-tab title="【量/檢具】">
        <p>I'm the second tab</p>
        <b-table :items="MeasuringDetail" :fields="MeasuringItemColumn">
        </b-table>
      </b-tab>
      <b-tab title="【夾/治具及設備】">
        <p>I'm a disabled tab!</p>
        <b-table :items="FixtureDetail" :fields="FixtureItemColumn">
        </b-table>
      </b-tab>
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
          key: "no",
          label: "編號",
          sortable: true,
        },
        {
          key: "partLevel",
          label: "構成關係",
          sortable: true
        },
         {
          key: "partNumber",
          label: "件號",
          sortable: true
        },
         {
          key: "partName",
          label: "件名",
          sortable: true
        },
         {
          key: "partName_Eng",
          label: "件名(英文)",
          sortable: true
        },
         {
          key: "material",
          label: "Bom表材質",
          sortable: true
        },
         {
          key: "thicknessWire",
          label: "線徑與板厚",
          sortable: true
        },
         {
          key: "routingNo1",
          label: "途程代號(1)",
          sortable: true
        },
         {
          key: "routingRule1",
          label: "途程規範(1)",
          sortable: true
        },
        {
          key: "routingNo2",
          label: "途程代號(2)",
          sortable: true
        },
         {
          key: "routingRule2",
          label: "途程規範(2)",
          sortable: true
        },
        {
          key: "routingNo3",
          label: "途程代號(3)",
          sortable: true
        },
        {
          key: "routingRule3",
          label: "途程規範(3)",
          sortable: true
        },
         {
          key: "routingNo4",
          label: "途程代號(4)",
          sortable: true
        },
        {
          key: "routingRule4",
          label: "途程規範(4)",
          sortable: true
        },
         {
          key: "neworOld",
          label: "新件/延用件",
          sortable: true
        },
         {
          key: "oldCarType",
          label: "延用車型",
          sortable: true
        },
         {
          key: "source",
          label: "來源",
          sortable: true
        },
         {
          key: "quantity",
          label: "數量",
          sortable: true
        },
           {
          key: "category",
          label: "類別",
          sortable: true
        },
         {
          key: "remark",
          label: "備註",
          sortable: true
        },
      ],
      MeasuringDetail: null,
      MeasuringItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true 
        },
        {
          key: "partNumber",
          label: "件號",
          sortable: true 
        },
        {
          key: "needMeausring",
          label: "需要量檢具",
          sortable: true 
        },
        {
          key: "quantity",
          label: "數量",
          sortable: true 
        },
        {
          key: "measuringName",
          label: "量檢具名稱",
          sortable: true 
        },
        {
          key: "measuringRemark",
          label: "量檢具備註",
          sortable: true 
        }
      ],
      FixtureDetail: null,
      FixtureItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true
        },
        {
          key: "partNumber",
          label: "件號",
          sortable: true
        },
        {
          key: "engineeringName",
          label: "工程名稱",
          sortable: true
        },
        {
          key: "engineeringOrder",
          label: "組立工序",
          sortable: true
        },
        {
          key: "share",
          label: "是否共用",
          sortable: true
        },
        {
          key: "needFixture",
          label: "需要夾治具",
          sortable: true
        },
        {
          key: "fixtureName",
          label: "夾治具名稱",
          sortable: true
        },
        {
          key: "fixtureQuantity",
          label: "夾治具套數",
          sortable: true
        },
        {
          key: "departemntId",
          label: "報價單位",
          sortable: true
        },
        {
          key: "fixtureRemark",
          label: "夾治具備註",
          sortable: true
        },
        {
          key: "needEquipment",
          label: "需要設備",
          sortable: true
        },
        {
          key: "equipmentName",
          label: "設備名稱",
          sortable: true
        },
        {
          key: "equipmentQuantity",
          label: "設備數量",
          sortable: true
        },
        {
          key: "equipmentRemark",
          label: "設備備註",
          sortable: true
        },
      ],
    };
  },
  mounted() {
    this.GetBomDetail('Test-53510-BZ100');
  },
  methods: {
    async GetBomDetail(params) {
      const self = this;
      await api.GetBomDetail.r(params)
        .then((res) => {
          self.BomDetail = res.data.bomItems;
          self.MeasuringDetail = res.data.measuringItems;
          self.FixtureDetail = res.data.fixtureItems;
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
  },
};
</script>