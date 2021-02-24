<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="BomDetails">
    <b-tabs>
      <div>
        <b-tab title="【Bom續頁】">
          <!-- table-responsive text-nowrap 
          If you want use a .text-nowrap you have to use div wrapper with 
          .table-responsive class because your table will be broken on small on small screens. -->
          <b-table
            class="text-nowrap text-center"
            responsive
            :items="BomDetail"
            :fields="BomItemColumn"
            outlined
            bordered
            sort-by="no"
          >
            <template v-slot:cell()="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-input v-else v-model="item[field.key]" />
            </template>

            <template v-slot:cell(partLevel)="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-select
                v-else
                v-model="item[field.key]"
                :options="partLevelOptions"
              />
            </template>

            <template v-slot:cell(neworOld)="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-select
                v-else
                v-model="item[field.key]"
                :options="newOldOptions"
                @change="newOldChange(item)"
              />
            </template>

            <template v-slot:cell(oldCarType)="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-input
                v-if="
                  edit == item.no &&
                  field.editable == true &&
                  item.neworOld == 'Old'
                "
                v-model="item[field.key]"
              />
            </template>

            <template v-slot:cell(source)="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-select
                v-if="edit == item.no && field.editable == true"
                v-model="item[field.key]"
                :options="sourceOptions"
              />
            </template>

            <template v-slot:cell(quantity)="{ value, item, field }">
              <template v-if="edit != item.no || field.editable == false">
                {{ value }}
              </template>
              <b-form-input
                v-if="edit == item.no && field.editable == true"
                v-model="item[field.key]"
                type="number"
              />
            </template>

            <template v-slot:cell(actions)="{ item }">
              <b-button-group
                v-if="BomCurrentRow && BomCurrentRow.no === item.no"
              >
                <b-btn variant="success" @click="SaveBomRow(item)">
                  儲存
                </b-btn>
                <b-btn variant="danger" @click="ResetEdit"> 取消 </b-btn>
              </b-button-group>
              <b-btn v-else variant="primary" @click="EditBomRow(item)">
                編輯
              </b-btn>
            </template>
          </b-table>
        </b-tab>

        <b-tab title="【量/檢具】">
          <b-table
            responsive
            :items="MeasuringDetail"
            :fields="MeasuringItemColumn"
            sort-by="no"
          >
          </b-table>
        </b-tab>
        <b-tab title="【夾/治具及設備】">
          <b-table
            responsive
            :items="FixtureDetail"
            :fields="FixtureItemColumn"
            sort-by="no"
          >
          </b-table>
        </b-tab>
      </div>
    </b-tabs>
  </div>
</template>

<script>
import * as api from "../api/Bom";
export default {
  name: "BomDetails",
  computed: {},
  props: {
    title: { type: String, default: null },
    id: { type: String, default: null },
    show: { type: Boolean, default: null },
  },
  data() {
    return {
      OrderBy: "no",
      edit: null,
      BomDetail: null,
      BomCurrentRow: null,
      BomItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true,
          editable: false,
          thStyle: { width: "1000px" }
        },
        {
          key: "partLevel",
          label: "構成關係",
          sortable: true,
          editable: true,
        },
        {
          key: "partNumber",
          label: "件號",
          sortable: true,
          stickyColumn: true,
          editable: true,
        },
        {
          key: "partName",
          label: "件名",
          sortable: true,
          editable: true,
        },
        {
          key: "partName_Eng",
          label: "件名(英文)",
          sortable: true,
          editable: true,
        },
        {
          key: "material",
          label: "Bom表材質",
          sortable: true,
          editable: true,
        },
        {
          key: "thicknessWire",
          label: "線徑與板厚",
          sortable: true,
          editable: true,
        },
        {
          key: "routingNo1",
          label: "途程代號(1)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingRule1",
          label: "途程規範(1)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingNo2",
          label: "途程代號(2)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingRule2",
          label: "途程規範(2)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingNo3",
          label: "途程代號(3)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingRule3",
          label: "途程規範(3)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingNo4",
          label: "途程代號(4)",
          sortable: true,
          editable: true,
        },
        {
          key: "routingRule4",
          label: "途程規範(4)",
          sortable: true,
          editable: true,
        },
        {
          key: "neworOld",
          label: "新件/延用件",
          sortable: true,
          editable: true,
        },
        {
          key: "oldCarType",
          label: "延用車型",
          sortable: true,
          editable: true,
        },
        {
          key: "source",
          label: "來源",
          sortable: true,
          editable: true,
        },
        {
          key: "quantity",
          label: "數量",
          sortable: true,
          editable: true,
          // thStyle: { width: "100px" }
        },
        {
          key: "category",
          label: "類別",
          sortable: true,
          editable: true,
        },
        {
          key: "remark",
          label: "備註",
          sortable: true,
          editable: true,
        },
        {
          key: "actions",
        },
      ],
      partLevelOptions: [
        { value: 0, text: 0 },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
      ],
      newOldOptions: [
        { value: "New", text: "New" },
        { value: "Old", text: "Old" },
      ],
      sourceOptions: null,
      MeasuringDetail: null,
      MeasuringItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true,
        },
        {
          key: "partNumber",
          label: "件號",
          sortable: true,
        },
        {
          key: "needMeausring",
          label: "需要量檢具",
          sortable: true,
        },
        {
          key: "quantity",
          label: "數量",
          sortable: true,
        },
        {
          key: "measuringName",
          label: "量檢具名稱",
          sortable: true,
        },
        {
          key: "measuringRemark",
          label: "量檢具備註",
          sortable: true,
        },
      ],
      FixtureDetail: null,
      FixtureItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true,
        },
        {
          key: "partNumber",
          label: "件號",
          sortable: true,
        },
        {
          key: "engineeringName",
          label: "工程名稱",
          sortable: true,
        },
        {
          key: "engineeringOrder",
          label: "組立工序",
          sortable: true,
        },
        {
          key: "share",
          label: "是否共用",
          sortable: true,
        },
        {
          key: "needFixture",
          label: "需要夾治具",
          sortable: true,
        },
        {
          key: "fixtureName",
          label: "夾治具名稱",
          sortable: true,
        },
        {
          key: "fixtureQuantity",
          label: "夾治具套數",
          sortable: true,
        },
        {
          key: "departemntId",
          label: "報價單位",
          sortable: true,
        },
        {
          key: "fixtureRemark",
          label: "夾治具備註",
          sortable: true,
        },
        {
          key: "needEquipment",
          label: "需要設備",
          sortable: true,
        },
        {
          key: "equipmentName",
          label: "設備名稱",
          sortable: true,
        },
        {
          key: "equipmentQuantity",
          label: "設備數量",
          sortable: true,
        },
        {
          key: "equipmentRemark",
          label: "設備備註",
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.GetBomDetail(this.id);
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
    EditBomRow(row) {
      this.edit = this.edit !== row.no ? row.no : null;
      let doEdit = true;
      if (this.BomCurrentRow && !confirm("尚有資料未儲存，是否要繼續?")) {
        doEdit = false;
      }
      if (doEdit) {
        this.BomCurrentRow = { ...row };
        this.newOldChange(row);
      }
    },
    ResetEdit() {
      this.edit = null;
      this.BomCurrentRow = null;
    },
    SaveBomRow(row) {
      //執行api
      console.log(row);
      this.ResetEdit();
    },
    newOldChange(item) {
      if (item.neworOld == "New") {
        item.oldCarType = null;
        this.sourceOptions = [
          { value: "進口件", text: "進口件" },
          { value: "支給件", text: "支給件" },
          { value: "自製件", text: "自製件" },
          { value: "外包件", text: "外包件" },
        ];
      } else if (item.neworOld == "Old") {
        this.sourceOptions = [{ value: "延用件", text: "延用件" }];
      }
    },
  },
};
</script>

<style>
.ColumnWidth {
  /* max-width: 5p; */
  width: 200px;
}
</style>

