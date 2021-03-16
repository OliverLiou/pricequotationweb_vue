<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div >
    <p>
      <vxe-radio-group v-model="selectTab">
        <vxe-radio-button
          label="bomDetail"
          content="Bom續頁"
        ></vxe-radio-button>
        <vxe-radio-button
          label="measuringDeatil"
          content="量/檢具"
        ></vxe-radio-button>
        <vxe-radio-button
          label="fixtureDetail"
          content="夾/治具及設備"
        ></vxe-radio-button>
      </vxe-radio-group>
    </p>
    <div v-show="selectTab === 'bomDetail'">
      <vxe-grid
        ref="xGrid"
        keep-source
        :columns="bomItemColumn"
        :data="bomDetailData"
        show-overflow
        show-header-overflow
        highlight-current-row
        align="center"
        border
        stripe
        resizable
        height="600"
        :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }"
        :sync-resize="selectTab"
        :loading="dataReading"
      >
      </vxe-grid>
    </div>

    <div v-show="selectTab === 'measuringDeatil'">
      <vxe-grid
        ref="xGrid2"
        keep-source
        :columns="measuringItemColumn"
        :data="measuringDetailData"
        show-overflow
        show-header-overflow
        highlight-current-row
        align="center"
        border
        stripe
        resizable
        height="700"
        :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }"
        :sync-resize="selectTab"
      >
      </vxe-grid>
    </div>

    <div v-show="selectTab === 'fixtureDetail'">
      <vxe-grid
        ref="xGrid3"
        keep-source
        :columns="fixtureItemColumn"
        :data="fixtureDetailData"
        show-overflow
        show-header-overflow
        highlight-current-row
        align="center"
        border
        stripe
        resizable
        height="700"
        :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }"
        :sync-resize="selectTab"
      >
      </vxe-grid>
    </div>
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
      dataReading: true,
      selectTab: "bomDetail",
      bomDetailData: null,
      BomCurrentRow: null,
      bomItemColumn: [
        {
          type: "seq",
          width: "3%"
        },
        {
          field: "bomItemId",
          title: "編號",
          sortable: true,
          width: "10%",
          visible: false
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
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.partNumber} />];
              }
            },
          },
        },
        {
          field: "partName",
          title: "件名",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.partName} />];
              }
            },
          },
        },
        {
          field: "partName_Eng",
          title: "件名(英文)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.partName_Eng} />];
              }
            }
          }
        },
        {
          field: "material",
          title: "Bom表材質",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.material} />];
              }
            }
          }
        },
        {
          field: "thicknessWire",
          title: "線徑與板厚",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.thicknessWire} />];
              }
            }
          }
        },
        {
          field: "routingNo1",
          title: "途程代號(1)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingNo1} />];
              }
            }
          }
        },
        {
          field: "routingRule1",
          title: "途程規範(1)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingRule1} />];
              }
            }
          }
        },
        {
          field: "routingNo2",
          title: "途程代號(2)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingNo2} />];
              }
            }
          }
        },
        {
          field: "routingRule2",
          title: "途程規範(2)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingRule2} />];
              }
            }
          }
        },
        {
          field: "routingNo3",
          title: "途程代號(3)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingNo3} />];
              }
            }
          }
        },
        {
          field: "routingRule3",
          title: "途程規範(3)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingRule3} />];
              }
            }
          }
        },
        {
          field: "routingNo4",
          title: "途程代號(4)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingNo4} />];
              }
            }
          }
        },
        {
          field: "routingRule4",
          title: "途程規範(4)",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.routingRule4} />];
              }
            }
          }
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
                    onChange={() => this.newOldChangeEvent(row)}
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
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (
                this.$refs.xGrid.isActiveByRow(row) &&
                row.neworOld === "Old"
              ) {
                return [<vxe-input v-model={row.oldCarType} />];
              }
            },
          },
        },
        {
          field: "source",
          title: "來源",
          sortable: true,
          minWidth: "8%",
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
          minWidth: "8%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.quantity} type="number" />];
              }
            },
          },
        },
        {
          field: "category",
          title: "製造類別",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <vxe-select
                    v-model={row.category}
                    options={this.categoryOptions}
                  />,
                ];
              }
            },
          },
        },
        {
          field: "modelCategory",
          title: "模具類別",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <vxe-select
                    v-model={row.modelCategory}
                    options={this.modelCategoryOptions}
                  />,
                ];
              }
            },
          },
        },
        {
          field: "remark",
          title: "備註",
          sortable: true,
          minWidth: "10%",
          editRender: { name: "input" },
          slots: {
            edit: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [<vxe-input v-model={row.remark} />];
              }
            }
          }
        },
        {
          title: "操作",
          fixed: "right",
          slots: {
            default: ({ row }) => {
              if (this.$refs.xGrid.isActiveByRow(row)) {
                return [
                  <vxe-button
                    status="success"
                    content="儲存"
                    onClick={() => {
                      this.BomItemUpdate(row);
                    }}
                  />,
                  <vxe-button
                    status="danger"
                    content="取消"
                    onClick={() => {
                      this.cancelRowEvent(row);
                    }}
                  />,
                ];
              } else {
                return [
                  <vxe-button
                    status="primary"
                    content="編輯"
                    onClick={() => {
                      this.editRowEvent(row);
                    }}
                  />,
                ];
              }
            },
          },
          minWidth: "12%",
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
      categoryOptions: [
        { value: "沖壓件", text: "沖壓件", label: "沖壓件" },
        { value: "塑膠件", text: "塑膠件", label: "塑膠件" },
        { value: "鍛造件", text: "鍛造件", label: "鍛造件" },
        { value: "其它", text: "其它", label: "其它" },
      ],
      sourceOptions: null,
      modelCategoryOptions: [
        { value: "模具自製", text: "模具自製", label: "模具自製" },
        { value: "模具外包", text: "模具外包", label: "模具外包" },
      ],
      measuringDetailData: null,
      measuringItemColumn: [
        {
          type: "seq",
          width: "3%"
        },
        {
          field: "measuringItemId",
          title: "編號",
          sortable: true,
          visible: false
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
          editRender: { name: "input" },
        },
        {
          field: "quantity",
          title: "數量",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "measuringName",
          title: "量檢具名稱",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "measuringRemark",
          title: "量檢具備註",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          title: "操作",
          slots: {},
        },
      ],
      fixtureDetailData: null,
      fixtureItemColumn: [
        {
          type: "seq",
          width: "3%"
        },
        {
          field: "fixtureItemId",
          title: "編號",
          sortable: true,
          visible: false
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
          editRender: { name: "input" },
        },
        {
          field: "engineeringOrder",
          title: "組立工序",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "share",
          title: "是否共用",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "needFixture",
          title: "需要夾治具",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "fixtureName",
          title: "夾治具名稱",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "fixtureQuantity",
          title: "夾治具套數",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "departemntId",
          title: "報價單位",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "fixtureRemark",
          title: "夾治具備註",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "needEquipment",
          title: "需要設備",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "equipmentName",
          title: "設備名稱",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "equipmentQuantity",
          title: "設備數量",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          field: "equipmentRemark",
          title: "設備備註",
          sortable: true,
          editRender: { name: "input" },
        },
        {
          title: "操作",
          slots: {},
        },
      ],
    };
  },
  mounted() {
    this.GetBomItems(this.id);
  },
  methods: {
    async GetBomItems(params) {
      this.dataReading = true;
      const self = this;
      await api.GetBomItems.r(params)
        .then((res) => {
          self.bomDetailData = res.data.bomItems;
          self.measuringDetailData = res.data.measuringItems;
          self.fixtureDetailData = res.data.fixtureItems;
        })
        .catch((res) => {
          alert(res.response.data.Error.join("\n"));
        });
      this.dataReading = false;
    },
    editRowEvent(row) {
      this.newOldChangeEvent(row);
      this.$refs.xGrid.setActiveRow(row);
    },
    cancelRowEvent(row) {
      this.$refs.xGrid.clearActived();
      this.$refs.xGrid.revertData(row);
    },
    newOldChangeEvent(row) {
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
      if (!this.sourceOptions.some((item) => item.value === row.source)) {
        row.source = null;
      }
    },
    async BomItemUpdate(row) {
      await api.UpdateBomItem.r(row.bomItemId, row)
        .then(() => {
          alert("更新成功！");
          this.GetBomItems(this.id);
        })
        .catch((res) => {
          alert(res.response.data.Error.join("\n"));
        });
    },
  },
};
</script>


