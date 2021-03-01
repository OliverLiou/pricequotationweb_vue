<!-- eslint-disable vue/no-unused-vars -->
<!-- #region Body -->
<!--<template>
  <div id="BomDetails">
    <b-tabs>
      <div>
        <b-tab title="【Bom續頁】">
          table-responsive text-nowrap 
          If you want use a .text-nowrap you have to use div wrapper with 
          .table-responsive class because your table will be broken on small on small screens.
          <b-table
            class="BomTableCss"
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
            :items="FixtureDetail"
            :fields="FixtureItemColumn"
            sort-by="no"
          >
          </b-table>
        </b-tab>
      </div>
    </b-tabs>
  </div>
</template> -->
<!-- #endregion -->

<template>
  <div>
    <vxe-grid
      ref="xGrid"
      keep-source
      :columns="bomItemColumn"
      :data="bomDetailData"
      show-overflow
      highlight-current-row
      align="center"
      border
      stripe
      auto-resize
      resizable
      :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }"
    >
    </vxe-grid>
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
      edit: null,
      bomDetailData: null,
      BomCurrentRow: null,
      bomItemColumn: [
        {
          field: "no",
          title: "編號",
          sortable: true,
          minWidth: "10%",
        },
        {
          field: "partLevel",
          title: "構成關係",
          sortable: true,
          minWidth: "7%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <vxe-select
                    v-model={row.partLevel}
                    options={this.partLevelOptions}
                  />,
                ];
              } else {
                return row.partLevel;
              }
            },
          },
        },
        {
          field: "partNumber",
          title: "件號",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "partName",
          title: "件名",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "partName_Eng",
          title: "件名(英文)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "material",
          title: "Bom表材質",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "thicknessWire",
          title: "線徑與板厚",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingNo1",
          title: "途程代號(1)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingRule1",
          title: "途程規範(1)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingNo2",
          title: "途程代號(2)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingRule2",
          title: "途程規範(2)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingNo3",
          title: "途程代號(3)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingRule3",
          title: "途程規範(3)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingNo4",
          title: "途程代號(4)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "routingRule4",
          title: "途程規範(4)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          field: "neworOld",
          title: "新件/延用件",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <vxe-select
                    v-model={row.neworOld}
                    options={this.newOldOptions}
                    onChange= {() => this.newOldChangeEvent(row)}
                  />,
                ];
              } else {
                return row.neworOld;
              }
            },
          },
        },
        {
          field: "oldCarType",
          title: "延用車型",
          sortable: true,
          minWidth: "10%",
          // editRender: { name: "input" },
        },
        {
          field: "source",
          title: "來源",
          sortable: true,
          minWidth: "5%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row) && row.neworOld != null) {
                return [
                  <vxe-select
                    v-model={row.source}
                    options={this.sourceOptions}
                  />,
                ];
              } else {
                return row.source;
              }
            },
          },
        },
        {
          field: "quantity",
          title: "數量",
          sortable: true,
          minWidth: "5%",
          editRender: { name: "input" },
        },
        {
          field: "category",
          title: "類別",
          sortable: true,
          minWidth: "5%",
          editRender: { name: "input" },
        },
        {
          field: "remark",
          title: "備註",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
        },
        {
          title: "操作",
          fixed: "right",
          slots: {
            default: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <b-button>儲存</b-button>,
                  <b-button
                    onClick={() => {
                      this.cancelRowEvent(row);
                    }}
                  >
                    取消
                  </b-button>,
                ];
              } else {
                return [
                  <b-button
                    onClick={() => {
                      this.editRowEvent(row);
                    }}
                  >
                    {" "}
                    編輯
                  </b-button>,
                ];
              }
            },
          },
          minWidth: "10%",
        },
      ],
      partLevelOptions: [
        { value: 0, text: 0, label: 0 },
        { value: 1, text: 1, label: 1 },
        { value: 2, text: 2, label: 2 },
        { value: 3, text: 3, label: 3 },
        { value: 4, text: 4, label: 4 },
        { value: 5, text: 5, label: 5 },
        { value: 6, text: 6, label: 6 },
        { value: 7, text: 7, label: 7 },
        { value: 8, text: 8, label: 8 },
        { value: 9, text: 9, label: 9 },
      ],
      newOldOptions: [
        { value: "New", text: "New", label: "New" },
        { value: "Old", text: "Old", label: "Old" },
      ],
      sourceOptions: null,
      measuringDetailData: null,
      MeasuringItemColumn: [
        {
          field: "no",
          title: "編號",
          sortable: true,
        },
        {
          field: "partNumber",
          title: "件號",
          sortable: true,
        },
        {
          field: "needMeausring",
          title: "需要量檢具",
          sortable: true,
        },
        {
          field: "quantity",
          title: "數量",
          sortable: true,
        },
        {
          field: "measuringName",
          title: "量檢具名稱",
          sortable: true,
        },
        {
          field: "measuringRemark",
          title: "量檢具備註",
          sortable: true,
        },
      ],
      fixtureDetailData: null,
      FixtureItemColumn: [
        {
          field: "no",
          title: "編號",
          sortable: true,
        },
        {
          field: "partNumber",
          title: "件號",
          sortable: true,
        },
        {
          field: "engineeringName",
          title: "工程名稱",
          sortable: true,
        },
        {
          field: "engineeringOrder",
          title: "組立工序",
          sortable: true,
        },
        {
          field: "share",
          title: "是否共用",
          sortable: true,
        },
        {
          field: "needFixture",
          title: "需要夾治具",
          sortable: true,
        },
        {
          field: "fixtureName",
          title: "夾治具名稱",
          sortable: true,
        },
        {
          field: "fixtureQuantity",
          title: "夾治具套數",
          sortable: true,
        },
        {
          field: "departemntId",
          title: "報價單位",
          sortable: true,
        },
        {
          field: "fixtureRemark",
          title: "夾治具備註",
          sortable: true,
        },
        {
          field: "needEquipment",
          title: "需要設備",
          sortable: true,
        },
        {
          field: "equipmentName",
          title: "設備名稱",
          sortable: true,
        },
        {
          field: "equipmentQuantity",
          title: "設備數量",
          sortable: true,
        },
        {
          field: "equipmentRemark",
          title: "設備備註",
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
          self.bomDetailData = res.data.bomItems;
          self.measuringDetailData = res.data.measuringItems;
          self.fixtureDetailData = res.data.fixtureItems;
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
    editRowEvent(row) {
      this.$refs.xGrid.setActiveRow(row);
    },
    cancelRowEvent(row) {
      // const fieldName = this.$refs.xGrid.getCurrentColumn();
      this.$refs.xGrid.revertData(row)
      this.$refs.xGrid.clearActived();
    },
    SaveBomRow(row) {
      //執行api
      console.log(row);
      this.ResetEdit();
    },
     newOldChangeEvent (row) {
      console.log(row);
      if (row.neworOld == "New") {
        row.oldCarType = null;
        this.sourceOptions = [
          { value: "進口件", text: "進口件", label: "進口件" },
          { value: "支給件", text: "支給件", label: "支給件" },
          { value: "自製件", text: "自製件", label: "自製件" },
          { value: "外包件", text: "外包件", label: "外包件" },
        ];
      } else if (row.neworOld == "Old") {
        this.sourceOptions = [
          { value: "延用件", text: "延用件", label: "延用件" },
        ];
      }
    },
  },
};
</script>


