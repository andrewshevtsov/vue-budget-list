<template>
  <ElCard class="form-card">
    <ElForm :model="formData" :rules="rules" label-position="top" ref="addItemForm">
      <ElFormItem label="Type" prop="type">
        <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
          <ElOption label="Income" value="INCOME" />
          <ElOption label="Outcome" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton
        type="primary"
        @click="onSubmit"
        v-on:keyup.enter="onSubmit">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
export default {
  name: 'Form',
  data: () => {

    var checkZero = (rule, value, callback) => {
      setTimeout(() => {
        if (value === 0) {
          callback(new Error('Value cannot be equal zero. Please, type correct value'));
        } else {
          callback();
        }
      }, 500);
    }

    return {
      formData : {
        type: 'INCOME',
        comment: '',
        value: 0,
      },
      rules: {
        type: [
          { required: true, message: 'Please select type', trigger: 'blur' },
        ],
        comment: [
          { required: true, message: 'Please type comment', trigger: 'change' },
        ],
        value: [
          { required: true, message: 'Please input value', trigger: 'blur' },
          { type: 'number', message: 'Value must be a number', trigger: 'blur' },
          { validator: checkZero, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.addItemForm.validate(valid => {
        if (valid) {
          this.$emit('submitForm', { ...this.formData });
          this.$refs.addItemForm.resetFields();
        }
      })
    },
  },
}
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}

.type-select {
  width: 100%;
}

.el-form-item {
  display: flex;
  flex-direction: column;
}
</style>