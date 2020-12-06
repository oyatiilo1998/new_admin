<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-breadcrumb style="margin: 10px 5px">
          <a-breadcrumb-item>{{ $t('categories') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </a-col>

      <a-col :span="12">
        <router-link v-action:add to="././create">
          <a-button style="float: right" shape="round" type="primary link" icon="plus">{{ $t('add') }}</a-button>
        </router-link>
      </a-col>
    </a-row>

    <a-card :title="$t('list')">
      <a-table
        v-action:get
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="getPagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="action" slot-scope="text, row">
          <!-- <a-tooltip><template slot="title">{{ $t('read') }}</template>
            <a-button style="margin-right: 6px" id="buttonPreview" type="default" @click="showPreviewModal(row.id)" icon="eye"></a-button>
          </a-tooltip> -->
          <router-link v-action:update :to="'./update/'+row.slug" >
            <a-tooltip><template slot="title">{{ $t('update') }}</template>
              <a-button style="margin-right: 6px" id="buttonUpdate" type="default" icon="edit"></a-button>
            </a-tooltip>
          </router-link>
          <a-popconfirm
            v-action:delete
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="deleteCategory($event, row.slug)"
            :okText="$t('yes')"
            :cancelText="$t('no')"
          >
            <a-tooltip><template slot="title">{{ $t('delete') }}</template>
              <a-button id="buttonDelete" type="danger" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model="previewVisible" width="800px" :title="$t('previewCategory')">
      <a-descriptions layout="vertical" bordered>
        <a-descriptions-item :label="$t('title_uz')">
          {{ selectedCategory.title_uz ? selectedCategory.title_uz : '' }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('title_ru')">
          {{ selectedCategory.title_ru ? selectedCategory.title_ru : '' }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('tariff')">
          {{ selectedCategory.title_en ? selectedCategory.title_en : '' }}
        </a-descriptions-item>
      </a-descriptions>
      <template slot="footer">
        <a-button id="buttonCancel" key="back" @click="handleCancel">
          {{ $t('cancel') }}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import request from '@/utils/request'
export default {
  data () {
    return {
      value: '',
      data: [],
      loading: true,
      searchForm: {
        searchKey: ''
      },
      columns: [
        {
          title: this.$t('Nomi'),
          dataIndex: 'name'
        },
        {
          title: this.$t('action'),
          key: 'action',
          width: '20%',
          scopedSlots: { customRender: 'action' }
        }
      ],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      previewVisible: false,
      selectedCategory: { tariff_details: { name: '' } },
      parentCategory: '',
      filterParams: {}
    }
  },
  computed: {
    ...mapGetters(['categories', 'paginationCategories']),
    getPagination () {
      return this.paginationCategories
    }
  },
  mounted () {
    this.$store.dispatch('getCategories').then(res => {
      console.log(res)
      this.data = res.data
    })
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions(['getCategories']),
    handleTableChange (pagination) {
      const paginationNew = {
        ...pagination,
        search: null
      }
      this.getCategories(paginationNew)
    .then((res) => console.log(res))
    .catch(err => this.requestFailed(err))
    },
    getselectedCategory (selectedCategory) {
      request({
        url: '/categories/' + selectedCategory,
        method: 'get'
      }).then((response) => {
        this.selectedCategory = response.category
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    deleteCategory (e, id) {
      request({
              url: '/categories/' + id,
              method: 'delete'
          }).then(res => {
              console.log(res)
              this.$message.success(this.$t('successfullyDeleted'))
              this.getCategories()
          }).then(err => {
        if (err) {
          this.$message.error(this.$t('error'))
        }
      })
    }
  }
}
</script>
