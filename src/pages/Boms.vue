<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="app">
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
      <b-table :items="Boms" :fields="Column">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(action)="row">
          <!-- # = v-slot縮寫 -->
          <b-button
            variant="outline-primary"
            size="sm"
            class="mr-1"
            @click="ControlModal(row.item)"
          >
            詳細資料
          </b-button>
        </template>
      </b-table>
    </div>
    <template>
      <b-modal v-model="modalParms.show" :title="modalParms.title">
        <BomDetail
          :id="modalParms.assemblyPartNumber"
          :show="modalParms.show"
        />
      </b-modal>
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
        "index",
        {
          key: "assemblyPartNumber",
          sortable: true,
          label: "總成件號",
        },
        {
          key: "assemblyName",
          sortable: true,
          label: "總成件名",
        },
        {
          key: "assemblyNameEng",
          sortable: true,
          label: "總成件名(英)",
        },
        {
          key: "customer",
          sortable: true,
          label: "顧客",
        },
        {
          key: "model",
          sortable: true,
          label: "車型",
        },
        {
          key: "allFinishTime",
          sortable: true,
          label: "報價完成時間(預計)",
          formatter: "DateTimeFormat",
        },
        {
          key: "assemblyRemark",
          sortable: true,
          label: "總成備註",
        },
        {
          key: "createDate",
          sortable: true,
          label: "創立時間",
          formatter: "DateTimeFormat",
        },
        {
          key: "modifyDate",
          sortable: true,
          label: "最後編輯時間",
          formatter: "DateTimeFormat",
        },
        {
          key: "status",
          sortable: true,
          label: "狀態",
        },
        "action",
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
    // GetBomDetails(assemblyPartNumber) {
    //   const { href } = this.$router.resolve({
    //     name: "GetBomDetail",
    //     params: { assemblyPartNumber: assemblyPartNumber },
    //   });
    //   window.open(href, "_blank", "toolbar=yes, width=1300, height=900");
    // },
    ControlModal(rowData) {
      this.modalParms.show = true;
      this.modalParms.title = rowData.assemblyPartNumber + "詳細資料";
      this.modalParms.assemblyPartNumber = rowData.assemblyPartNumber;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.modal-dialog {
  min-width: 95%;
  /* min-height: 50%; */
  height: 100px;
  overflow-x: initial !important;
}
/* .modal-content {
  background-color: #2c3e50;
  overflow-x: auto;
} */
.modal-header {
  background-color: #337ab7;
  padding: 16px 16px;
  color: #fff;
  border-bottom: 2px dashed #337ab7;
}
</style>