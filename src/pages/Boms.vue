<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div field="app">
    <br />
    <div>
      <b-container>
        <b-form-group label="Bom表(Excel):" label-cols-sm="2" label-size="sm">
          <b-form-file
            accept=".xlsx"
            v-model="file"
            ref="file-input"
            class="mb-2"
          ></b-form-file>
          <b-button class="mr-2" @click="UploadBom">上傳</b-button>
        </b-form-group>
      </b-container>
    </div>

    <div>
      <vxe-grid
        :columns="Column"
        :data="Boms"
        align="center"
        border
        auto-resize
        resizable
      >
      </vxe-grid>
    </div>

    <template>
      <vxe-modal
        v-model="modalParms.show"
        :title="modalParms.title"
        width="90%"
        height="90%"
        :lock-scroll = false
        :esc-closable= true
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

export default {
  components: { BomDetail },
  name: "App",
  data() {
    return {
      file: null,
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
        },
        {
          field: "modifyDate",
          sortable: true,
          title: "最後編輯時間",
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
    UploadBom() {
      if (this.file == null) {
        alert("請選擇檔案後再上傳！");
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);
      this.$BomApi.CreateBom.r(formData, {
        Headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function () {
          this.file = this.$refs.file.files[0];
          alert("上傳成功！");
        })
        .catch(function (error) {
          alert(error.response.data.Error.join("\n"));
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
  },
};
</script>