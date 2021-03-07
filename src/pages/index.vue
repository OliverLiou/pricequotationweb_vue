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
            <b-button variant="info" @click="CreateOppo">上傳</b-button>
          </div>
        </b-form-group>
      </b-form-group>
    </b-container>

    <div>
      <vxe-grid
        align="center"
        border
        auto-resize
        resizable
        show-overflow
        show-header-overflow
        :data="Oppos"
        :columns="tableColumns"
        :tree-config="{ key: 'oPPOId', children: 'boms' }"
      >
      </vxe-grid>
    </div>

    <template>
      <vxe-modal
        v-model="modalParms.show"
        :title="modalParms.title"
        width="100%"
        height="95%"
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
              } else if (row.status <= 3 ) {
                return [
                  <b-button
                    variant="outline-warning"
                    class="mr-2"
                    onClick={() => {
                      
                    }}
                  >
                    上傳工裝表
                  </b-button>
                ]
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
    };
  },
  async mounted() {
    this.GetOppos();
  },
  methods: {
    async GetOppos() {
      await this.$OppoApi.GetOppos.r()
        .then((res) => {
          this.Oppos = res.data;
        })
        .catch(function (error) {
          // this.$refs.$vxeModal.alert(error.response.data.Error.join("\n"));
          alert(error)
        });
    },
    async CreateOppo() {
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
      this.$OppoApi.CreateOppo.r(this.oppoNumber, formData)
        .then(()=>{
          this.GetOppos();
          this.oppoNumber = ''
          this.files = []
          alert('上傳成功！')
        })
        .catch(function (error) {
          alert("上傳失敗！" + error);
        });
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