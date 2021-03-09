<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div field="app">
    <br />
    <b-container>
      <b-form-group>
        <vxe-input v-model="oppoNumber" placeholder="請輸入OPPO號碼" />
        <b-form-group>
          <div>
            <b-form-file
              ref="file-input"
              multiple
              accept=".xlsx"
              v-model="files"
            />
            <b-button variant="info" @click="UploadBom">上傳</b-button>
          </div>
        </b-form-group>
      </b-form-group>
    </b-container>

    <div>
      <vxe-grid
        :columns="Column"
        :data="Boms"
        align="center"
        border
        auto-resize
        resizable
        show-overflow
        show-header-overflow
      >
      </vxe-grid>
    </div>

    <template>
      <vxe-modal
        v-model="modalParms.show"
        :title="modalParms.title"
        width="90%"
        height="90%"
        :esc-closable="true"
        destroy-on-close
      >
        <BomDetail
          :id="modalParms.assemblyPartNumber"
          :show="modalParms.show"
        />
      </vxe-modal>
    </template>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import BomDetail from '../pages/BomDetails';
import BomDetail from "./BomDetails";
import XEUtils from "xe-utils";

export default {
  components: { BomDetail },
  name: "App",
  data() {
    return {
      oppoNumber: "",
      files: null,
      Boms: [],
      Column: [
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
          formatter: this.formatterDate
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
          formatter: this.formatterDate
        },
        {
          field: "modifyDate",
          sortable: true,
          title: "最後編輯時間",
          formatter: this.formatterDate
        },
        {
          field: "status",
          sortable: true,
          title: "狀態",
        },
        {
          title: "操作",
          slots: {
            default: ({ row }) => {
              return [
                <b-button
                  variant="outline-success"
                  class="mr-2"
                  onClick={() => {
                    this.ControlModal(row);
                  }}
                >
                  {" "}
                  詳細資料{" "}
                </b-button>,
              ];
            },
          },
        },
      ],
      modalParms: {
        show: false,
        assemblyPartNumber: null,
        title: null,
      },
    };
  },
  async mounted() {
    this.GetBoms();
  },
  methods: {
    async GetBoms() {
      const self = this;
      await this.$BomApi.GetBoms.r()
        .then((res) => {
          self.Boms = res.data;
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
        });
    },
    async UploadBom() {
      if (this.oppoNumber == "") {
        alert("請輸入OPPO編號！");
        return;
      }
      if (this.files == null) {
        alert("請選擇檔案後再上傳！");
        return;
      }
      let formData = new FormData();
      this.files.forEach(function (params) {
        formData.append("file", params);
      });
      this.$BomApi.CreateBoms.r(this.oppoNumber, formData, {
        Headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function () {
          // this.files = this.$refs.file.files[0];
          // this.$vxeModal("上傳成功！");
          alert("上傳成功！");
          this.GetBoms();
        })
        .catch(function (error) {
          alert("上傳失敗！" + error.response.data.Error.join("\n"));
        });
    },
    DateTimeFormat(date) {
      if (date != null) {
        return this.$moment(date).format("YYYY-MM-DD");
      }
    },
    ControlModal(rowData) {
      this.modalParms.show = true;
      this.modalParms.title = rowData.assemblyPartNumber + "詳細資料";
      this.modalParms.assemblyPartNumber = rowData.assemblyPartNumber;
    },
    formatterDate({ cellValue }) {
      return XEUtils.toDateString(cellValue, "yyyy-MM-dd");
    },
  },
};
</script>