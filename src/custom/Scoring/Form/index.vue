<template>
  <a-card>
    <a-form-model :colon="false" ref="ruleForm" :model="form" :rules="rules">
      <a-row class="form-row" :gutter="16">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div style="margin-top: 25px" class="steps-content">

          <div class="step-1" v-if="current === 0">
            <a-form-model
              ref="ruleFormPassport"
              :model="passportDetails"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('firstName')" prop="first_name">
                    <a-input
                      v-model="passportDetails.first_name"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('lastName')" prop="last_name">
                    <a-input
                      v-model="passportDetails.last_name"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('middleName')" prop="middle_name">
                    <a-input
                      v-model="passportDetails.patrynomic"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('birthDate')" prop="birthday">
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      placeholder=""
                      v-model="passportDetails.birthday"
                      style="width: 100%"/>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('gender')" prop="gender">
                    <a-select
                      v-model="passportDetails.gender"
                    >
                      <a-select-option :key="1" :value="1">
                        {{ $t('male') }}
                      </a-select-option>
                      <a-select-option :key="2" :value="2">
                        {{ $t('female') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('PassportSerialAndNumber')" prop="doc_number">
                    <a-input
                      v-model="passportDetails.doc_number"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('place_of_issue')" prop="place_of_issue">
                    <a-input
                      v-model="passportDetails.place_of_issue"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('issueDate')" prop="date_of_issue">
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      v-model="passportDetails.date_of_issue"
                      style="width: 100%"/>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('expiryDate')" prop="date_of_expiry">
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      v-model="passportDetails.date_of_expiry"
                      style="width: 100%"/>
                  </a-form-model-item>
                </a-col>
                <a-col :md="8" :xs="24" style="padding: 0 15px">
                  <a-form-model-item
                    :label="$t('inn')"
                    prop="inn"
                  >
                    <a-input :max-length="9" v-model="passportDetails.inn" id="validating" />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('region_of_registration')" prop="region_of_registration">
                    <a-input
                      v-model="passportDetails.region_of_registration"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('district_of_registration')" prop="district_of_registration">
                    <a-input
                      v-model="passportDetails.district_of_registration"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('house_number')" prop="house_number">
                    <a-input
                      v-model="passportDetails.house_number"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('registration_address')" prop="registration_address">
                    <a-input
                      v-model="passportDetails.registration_address"
                    />
                  </a-form-model-item>
                </a-col>
                <!-- <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item :label="$t('passportPhotoReg')" prop="passportPhotoReg">
                    <a-upload
                      name="file"
                      method="post"
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="false"
                      action="https://api.api.uz/v1/upload"
                      @change="onPassportRegChange"
                    >
                      <img v-if="loadingUrlReg" :src="loadingUrlReg" alt="avatar" width="200" height="85" />
                      <div v-else>
                        <a-icon :type="loadingReg ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                          {{ $t('passportPhotoReg') }}
                        </div>
                      </div>
                    </a-upload>
                  </a-form-model-item>
                </a-col> -->
              </a-row>
            </a-form-model>
          </div>
          <div class="step-2" :title="$t('passportDetails')" v-if="current === 1">
            <a-form-model
              ref="ruleFormUser"
              :model="user"
              :rules="rulesDetails"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('place_of_birth')" prop="place_of_birth">
                    <a-input
                      v-model="user.place_of_birth"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('family_status')" prop="family_status">
                    <a-select
                      v-model="user.family_status"
                    >
                      <a-select-option key="single" value="single">
                        {{ $t('single') }}
                      </a-select-option>
                      <a-select-option key="divorced" value="divorced">
                        {{ $t('divorced') }}
                      </a-select-option>
                      <a-select-option key="married" value="married">
                        {{ $t('married') }}
                      </a-select-option>
                      <a-select-option key="widow" value="widow">
                        {{ $t('widow') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('children')" prop="children">
                    <a-input
                      type="number"
                      v-model="user.children"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('education')" prop="education">
                    <a-input
                      v-model="user.education"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('place_of_work')" prop="place_of_work">
                    <a-input
                      v-model="user.place_of_work"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('profession')" prop="profession">
                    <a-input
                      v-model="user.profession"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="12" style="padding: 0 15px">
                  <a-form-model-item :label="$t('income_per_month')" prop="income_per_month">
                    <a-input
                      v-model="user.income_per_month"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
          <div class="step-3" v-if="current === 2">
            <a-form-model
              ref="ruleFormCard"
              :model="cardDetails"
              :rules="rulesCard"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row style="margin-top:20px;">
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('cardNumber')" prop="card_number">
                    <a-input
                      type="number"
                      v-model="cardDetails.card_number"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('card_expiry')" prop="card_expiry">
                    <a-month-picker
                      value-format="MM/YYYY"
                      format="MM/YYYY"
                      v-model="card_expiry"
                      style="width: 100%"/>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('phone_number_of_card')" prop="phone_number_of_card">
                    <a-input
                      v-model="cardDetails.phone_number_of_card"
                    />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
          <div class="step-4" v-if="current === 3">
            <a-form-model
              ref="ruleFormCredit"
              :model="creditDetails"
              :rules="rulesCredit"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
            >
              <a-row style="margin-top:20px;">
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('expiry_month_count')" prop="expiry_month_count">
                    <a-input
                      type="number"
                      v-model="creditDetails.expiry_month_count"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('installment_amount')" prop="installment_amount">
                    <a-input
                      type="number"
                      v-model="creditDetails.installment_amount"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('per_month_amount')" prop="per_month_amount">
                    <a-input
                      type="number"
                      v-model="creditDetails.per_month_amount"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('percent_markup')" prop="percent_markup">
                    <a-input
                      type="number"
                      v-model="creditDetails.percent_markup"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" style="padding: 0 15px">
                  <a-form-model-item ref="name" :label="$t('price_in_merchant')" prop="price_in_merchant">
                    <a-input
                      type="number"
                      v-model="creditDetails.price_in_merchant"
                    />
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="6" style="padding: 0 15px">
                  <a-form-model-item class="input-phone" :label="$t('has_credit_now')" prop="has_credit_now">
                    <a-switch default-checked v-model="creditDetails.has_credit_now" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">
            {{ $t('next') }}
          </a-button>
          <a-button
            v-if="current === steps.length - 1"
            type="primary"
            @click="onSubmit"
          >
            {{ $t('done') }}
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
            {{ $t('previous') }}
          </a-button>
        </div></a-row>
    </a-form-model>
    <a-modal v-model="previewVisible">
      <a-descriptions>
        <a-descriptions-item :title="scoring">
          Scoring: {{ scoring }}
        </a-descriptions-item>
        <a-descriptions-item :title="amount">
          Amount: {{ amount }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </a-card>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      previewVisible: false,
      isNewForm: false,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      form: {
        lang: '',
        max_investment_amount: null,
        min_investment_amount: null,
        title: '',
        max_percent: null,
        min_percent: null
      },
      scoring: null,
      amount: null,
      current: 0,
      steps: [
        {
          title: this.$t('passportDetails')
        },
        {
          title: 'personalDetails'
        },
        {
          title: 'cardDetails'
        },
        {
          title: 'creditDetails'
        }
      ],
      card_expiry: null,
      user: {
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        email: '',
        login: '',
        password: '',
        passwordConfirm: ''
      },
      cardDetails: {
        card_number: null
      },
      creditDetails: {
      },
      passportDetails: {
      },
      passportPhotos: {
      },
      rules: {
        'title': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'max_percent': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'min_percent': [{
            required: true,
            message: 'Пожалуйста, введите',
            trigger: 'blur'
          }
          ]
      },
      rulesDetails: {
        'title': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'max_percent': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'min_percent': [{
            required: true,
            message: 'Пожалуйста, введите',
            trigger: 'blur'
          }
          ]
      },
      rulesCard: {
        'title': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'max_percent': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'min_percent': [{
            required: true,
            message: 'Пожалуйста, введите',
            trigger: 'blur'
          }
          ]
      },
      rulesCredit: {
        'title': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'max_percent': [{ required: true, message: 'Пожалуйста, введите', trigger: 'blur' }],
        'min_percent': [{
            required: true,
            message: 'Пожалуйста, введите',
            trigger: 'blur'
          }
          ]
      }
    }
  },
    watch: {
    'form.min_percent' (e) {
      if (parseInt(e) >= parseInt(this.form.max_percent)) this.form.min_percent = this.form.max_percent - 1
    },
     'form.max_percent' (e) {
        if (parseInt(e) === parseInt(this.form.min_percent)) this.form.min_percent = this.form.max_percent - 1
     },
      'form.min_investment_amount' (e) {
      if (parseInt(e) >= parseInt(this.form.max_investment_amount)) this.form.min_investment_amount = this.form.max_investment_amount - 1
      console.log(e)
    },
     'form.max_investment_amount' (e) {
        if (parseInt(e) === parseInt(this.form.min_investment_amount)) this.form.min_investment_amount = this.form.max_investment_amount - 1
     }
  },
  methods: {
    next () {
      if (this.current === 0) {
        this.$refs.ruleFormPassport.validate((valid) => {
          if (valid) this.current++
        })
      } else if (this.current === 1) {
        this.$refs.ruleFormUser.validate((valid) => {
          if (valid) this.current++
        })
      } else if (this.current === 2) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) this.current++
        })
      }
    },
    prev () {
      this.current--
    },
    getCategory (id) {
      this.$store.dispatch('getCategory', id).then((res) => {
        console.log(res)
        this.form = res.category
      })
    },
    onSubmit () {
      request({
        url: '/scoring',
        method: 'post',
        data: {
          category_id: '5fafec00a35c5d1d8bc4dc11',
          customer: {
              ...this.passportDetails,
              ...this.cardDetails,
              ...this.user,
              card_expiry_month: parseInt(this.card_expiry.split('/')[0]),
              card_expiry_year: parseInt(this.card_expiry.split('/')[1]),
              children: parseInt(this.user.children),
              gender: parseInt(this.passportDetails.gender),
              income_per_month: parseInt(this.user.income_per_month)
            },
              installment_amount: parseInt(this.creditDetails.installment_amount),
              per_month_amount: parseInt(this.creditDetails.per_month_amount),
              percent_markup: parseInt(this.creditDetails.percent_markup),
              price_in_merchant: parseInt(this.creditDetails.price_in_merchant),
              expiry_month_count: parseInt(this.creditDetails.expiry_month_count)
        }
      })
      .then((res) => {
        this.previewVisible = true
        this.scoring = res.scoring
        this.amount = res.amount
      })
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  created () {
  }
}
</script>

<style>
</style>
