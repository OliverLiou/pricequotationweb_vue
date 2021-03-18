<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div field="app">
    <vxe-form :data="UploadOppo">
      <vxe-form-item title="立項單號：" field="number">
        <template #default>
          <vxe-input
            v-model="UploadOppo.number"
            size="medium"
            class="my-domain"
            maxlength="6"
            placeholder="請輸入立項單號"
          >
            <template #prefix>
              <span>OPPO-</span>
            </template>
          </vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <vxe-button status="primary" content="瀏覽檔案" @click="CreateOppo()" />
      </vxe-form-item>
    </vxe-form>
    <br />
    <div>
      <vxe-grid
        ref="xTable"
        align="center"
        border
        auto-resize
        resizable
        show-overflow
        show-header-overflow
        :loading="tableLoading"
        :data="Oppos"
        :columns="tableColumns"
        :tree-config="{ key: 'oPPOId', children: 'boms' }"
      >
      </vxe-grid>
    </div>

    <vxe-modal
      v-model="modalParms.show"
      :title="modalParms.title"
      width="95%"
      height="80%"
      :esc-closable="true"
      destroy-on-close
    >
      <BomDetail :id="modalParms.assemblyPartNumber" :show="modalParms.show" />
    </vxe-modal>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import BomDetail from "..//pages/BomDetails";

export default {
  components: { BomDetail },
  name: "App",
  data() {
    return {
      UploadOppo: {
        number: "",
      },
      Oppos: [],
      tableColumns: [
        {
          field: "status",
          sortable: true,
          title: "狀態",
        },
        {
          field: "oppoId",
          sortable: true,
          title: "OPPO編號",
          treeNode: true,
        },
        {
          field: "assemblyPartNumber",
          sortable: true,
          title: "總成件號",
        },
        {
          field: "assemblyName",
          sortable: true,
          title: "總成件名",
        },
        {
          field: "assemblyNameEng",
          sortable: true,
          title: "總成件名(英)",
        },
        {
          field: "customer",
          sortable: true,
          title: "顧客",
        },
        {
          field: "model",
          sortable: true,
          title: "車型",
        },
        {
          field: "allFinishTime",
          sortable: true,
          title: "報價完成時間(預計)",
          formatter: this.formatterDate,
        },
        {
          field: "assemblyRemark",
          sortable: true,
          title: "總成備註",
        },
        {
          field: "createDate",
          sortable: true,
          title: "創立時間",
          formatter: this.formatterDate,
        },
        {
          field: "modifyDate",
          sortable: true,
          title: "最後編輯時間",
          formatter: this.formatterDate,
        },
        {
          title: "操作",
          slots: {
            default: ({ row }) => {
              if (row.status == null) {
                return [
                  <b-button
                    variant="outline-success"
                    class="mr-2"
                    onClick={() => {
                      this.ControlModal(row);
                    }}
                  >
                    詳細資料
                  </b-button>,
                ];
              } else if (row.status <= 3) {
                return [
                  <b-button
                    variant="outline-warning"
                    class="mr-2"
                    onClick={() => {
                      this.UpLoadBom(row.oppoId);
                    }}
                  >
                    上傳工裝表
                  </b-button>,
                ];
              }
            },
          },
        },
      ],
      modalParms: {
        show: false,
        assemblyPartNumber: null,
        title: null,
      },
      tableLoading: null,
    };
  },
  async mounted() {
    this.GetOppos();
  },
  methods: {
    async GetOppos() {
      this.tableLoading = true;
      await this.$OppoApi.GetOppos.r()
        .then((res) => {
          this.Oppos = res.data;
          this.tableLoading = false;
        })
        .catch((res) => {
          this.$vxeModal.alert(res.response.data.Error.join("\n"));
        });
    },
    async CreateOppo() {
      const oppoNumber = "OPPO-" + this.UploadOppo.number;
      if (oppoNumber.length <= 5) {
        this.$vxeModal.alert("請輸入OPPO編號！");
        return;
      }
      const { files } = await this.$XReadFile({
        multiple: true,
        types: ["xlsx"],
      });

      if (files === null) {
        this.$vxeModal.alert("請選擇檔案後再上傳！");
        return;
      }
      let formData = new FormData();
      let fileNames = "";
      files.forEach(function (params) {
        fileNames += params.name + ' ';
        formData.append("file", params);
      });
      this.$vxeModal.confirm("確定要將" + fileNames + "以上檔案上傳？")
        .then((type) => {
          if (type === "confirm") {
            this.$OppoApi.CreateOppo.r(oppoNumber, formData)
              .then(() => {
                this.GetOppos();
                this.UploadOppo.number = "";
                this.UploadOppo.files = [];
                this.$vxeModal.alert("上傳成功！");
              })
              .catch((res) => {
                this.$vxeModal.alert(res.response.data.Error.join("\n"));
              });
          }
        });
    },
    ControlModal(rowData) {
      this.modalParms.show = true;
      this.modalParms.title = rowData.assemblyPartNumber + "詳細資料";
      this.modalParms.assemblyPartNumber = rowData.assemblyPartNumber;
    },
    formatterDate({ cellValue }) {
      return this.$xEUtils.toDateString(cellValue, "yyyy-MM-dd");
    },
    async UpLoadBom(oppoId) {
      if (oppoId == null) {
        this.$vxeModal.alert("oppoId不得為空！");
      }
      this.$refs.xTable.readFile().then((excelFile) => {
        const formData = new FormData();
        formData.append("file", excelFile.file);
        this.$BomApi.CreateBom.r(oppoId, formData)
          .then(() => {
            this.$vxeModal.alert("上傳成功！");
            this.GetOppos();
          })
          .catch((res) => {
            this.$vxeModal.alert(res.response.data.Error.join("\n"));
          });
      });
    },
  },
};
</script>

<style scoped>
.my-domain.vxe-input {
  height: 34px;
  width: 300px;
}
.my-domain.vxe-input >>> .vxe-input--prefix {
  width: 60px;
  height: 32px;
  top: 1px;
  text-align: center;
  border-right: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}
.my-domain.vxe-input >>> .vxe-input--inner {
  padding-left: 72px;
  border: 1px solid #dcdfe6;
}
.my-vxeContent {
  width: 600px;
}
</style>