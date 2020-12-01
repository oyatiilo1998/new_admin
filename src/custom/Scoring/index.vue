<template>
  <page-header-wrapper :title="false">
    <a-card>
      <a-row type="flex" justify="end" class="mb-2">
        <a-col span="auto">
          <a-button type="primary" @click="$router.push('/scoring/list/new')">{{ $t('button.create') }}</a-button>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="categories"
        :row-key="record => record.id"
      >
        <span slot="max_investment_amount" slot-scope="text"> {{ $moneyFormat(text.max_investment_amount) }}</span>
        <span slot="min_investment_amount" slot-scope="text"> {{ $moneyFormat(text.min_investment_amount) }}</span>
        <span slot="min_percent" slot-scope="text"> <strong> {{ text.min_percent }}%  ~ {{ text.max_percent }}%</strong></span>
        <span slot="actions" slot-scope="text">
          <a-popconfirm
            title="Вы хотите это удалить?"
            ok-text="Да"
            cancel-text="Нет"
            @confirm="deleteCategory(text)"
            @cancel="cancel => null"
          >
            <a-tooltip placement="bottomLeft" :title="$t('button.delete')">
              <a-button type="danger" icon="delete" />
            </a-tooltip>
          </a-popconfirm>
          <a-tooltip placement="bottomLeft" :title="$t('button.edit')">
            <a-button class="mx-1" @click="$router.push('/category/list/edit/' + text.id)" type="primary" icon="edit" />
          </a-tooltip>
        </span>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
 data () {
     return {
         columns: [
             {
             title: 'Name',
             dataIndex: 'title',
             key: 'title'
         },
        //  {
        //      title: 'Language',
        //      dataIndex: 'lang',
        //      key: 'lang'
        //  },
          {
             title: 'Min. investment',
             scopedSlots: { customRender: 'min_investment_amount' },
             key: 'min_investment_amount'
         },
         {
             title: 'Max. investment',
             scopedSlots: { customRender: 'max_investment_amount' },
             key: 'max_investment_amount'
         },
          {
             title: '(Min ~ Max) percents',
             scopedSlots: { customRender: 'min_percent' },
             key: 'min_percent'
         },
        {
             title: 'Actions',
             scopedSlots: { customRender: 'actions' },
             key: 'actions',
            width: 150
      }
         ],
         categories: []
     }
 },
 methods: {
     getCategories () {
         this.$store.dispatch('getCategories').then(res => {
             console.log(res)
             this.categories = res.categories
         })
     },
     deleteCategory (e) {
        this.$store.dispatch('deleteCategory', e.id).then(res => {
            this.$deleteFromList(this.categories, e.id)
            this.$alertMessage('success', 'Deleted', 'Category deleted successfully', this)
          })
     }
 },
 created () {
     this.getCategories()
 }
}
</script>

<style>

</style>
