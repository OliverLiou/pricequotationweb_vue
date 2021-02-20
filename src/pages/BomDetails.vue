<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div id="BomDetails">
    <b-tabs content-class="mt-3">
      <div>
        <b-tab title="【Bom續頁】">
          <!-- table-responsive text-nowrap 
          If you want use a .text-nowrap you have to use div wrapper with 
          .table-responsive class because your table will be broken on small on small screens. -->
          <b-table
            class="table-responsive text-nowrap text-center"
            responsive
            :items="BomDetail"
            :fields="BomItemColumn"
            sort-by="no"
          >
            <template v-slot:cell(actions)="{ item }">
              <b-button-group
                v-if="BomCurrentRow && BomCurrentRow.no === item.no"
              >
                <b-btn variant="success" @click="SaveBomRow"> Save </b-btn>
                <b-btn variant="danger" @click="ResetEdit"> Cancel </b-btn>
              </b-button-group>
              <b-btn v-else variant="primary" @click="EditBomRow(item)">
                Edit
              </b-btn>
            </template>

            <!-- <template #cell(action)="row">
              <b-button 
              variant="outline-primary"
              size="sm" class="mr-2"
              >
                編輯
              </b-button>
            </template> -->
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
  computed: {
    editableFields() {
      return this.BomItemColumn.filter((field) => {
        console.log(field);
        return field.editable === true;
      });
    },
  },
  props: {
    title: { type: String, default: null },
    id: { type: String, default: null },
    show: { type: Boolean, default: null },
  },
  data() {
    return {
      OrderBy: "no",
      BomDetail: null,
      BomCurrentRow: null,
      BomItemColumn: [
        {
          key: "no",
          label: "編號",
          sortable: true,
        },
        {
          key: "partLevel",
          label: "構成關係",
          sortable: true,
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
        },
        {
          key: "material",
          label: "Bom表材質",
          sortable: true,
        },
        {
          key: "thicknessWire",
          label: "線徑與板厚",
          sortable: true,
        },
        {
          key: "routingNo1",
          label: "途程代號(1)",
          sortable: true,
        },
        {
          key: "routingRule1",
          label: "途程規範(1)",
          sortable: true,
        },
        {
          key: "routingNo2",
          label: "途程代號(2)",
          sortable: true,
        },
        {
          key: "routingRule2",
          label: "途程規範(2)",
          sortable: true,
        },
        {
          key: "routingNo3",
          label: "途程代號(3)",
          sortable: true,
        },
        {
          key: "routingRule3",
          label: "途程規範(3)",
          sortable: true,
        },
        {
          key: "routingNo4",
          label: "途程代號(4)",
          sortable: true,
        },
        {
          key: "routingRule4",
          label: "途程規範(4)",
          sortable: true,
        },
        {
          key: "neworOld",
          label: "新件/延用件",
          sortable: true,
        },
        {
          key: "oldCarType",
          label: "延用車型",
          sortable: true,
        },
        {
          key: "source",
          label: "來源",
          sortable: true,
        },
        {
          key: "quantity",
          label: "數量",
          sortable: true,
        },
        {
          key: "category",
          label: "類別",
          sortable: true,
        },
        {
          key: "remark",
          label: "備註",
          sortable: true,
        },
        {
          key: "actions",
          class: "text-center",
        },
        // 'actions',
      ],
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
      let doEdit = true;
      if ( this.BomCurrentRow &&
          !confirm("尚有資料未儲存，是否要繼續?")
      ) {
        doEdit = false;
      }
      if (doEdit) {
        this.BomCurrentRow = { ...row };
      }
    },
    ResetEdit() {
      this.BomCurrentRow = null;
    },
    // eslint-disable-next-line no-unused-vars
    SaveBomRow(row) {
      //執行api

      this.ResetEdit();
    }
  },
};
</script>
