<template>
  <div slot="" class="account-form">
    <h2 class="account-form__heading">Учетные записи <el-button @click="addAccount" type="primary">+</el-button></h2>
    <div class="warning">
      <el-tooltip content="Введите метки, разделяя их точкой с запятой (например, tag1; tag2)" placement="top">
        <el-icon>
          <QuestionFilled />
        </el-icon>
      </el-tooltip>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="6"><strong>Метки</strong></el-col>
      <el-col :span="5"><strong>Тип записи</strong></el-col>
      <el-col :span="6"><strong>Логин</strong></el-col>
      <el-col :span="6"><strong>Пароль</strong></el-col>
      <el-col :span="1"><strong></strong></el-col>
    </el-row>
    <el-form :model="form" @submit.prevent>
      <el-row v-for="(account, index) in accounts" :key="index" :gutter="5">
        <el-col :span="6">
          <el-form-item :error="validationErrors[index]?.label ? 'Поле обязательно' : ''">
            <el-input v-model="account.rawLabel" @blur="validateAndSave(index)" placeholder="Введите метки через ;"
              maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :error="validationErrors[index]?.type ? 'Поле обязательно' : ''">
            <el-select v-model="account.type" @change="validateAndSave(index)">
              <el-option label="LDAP" value="LDAP" />
              <el-option label="Локальная" value="Локальная" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="account.type === 'LDAP' ? 12 : 6">
          <el-form-item :error="validationErrors[index]?.login ? 'Поле обязательно' : ''">
            <el-input v-model="account.login" @blur="validateAndSave(index)" placeholder="Значение" maxlength="10" />
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="account.type === 'Локальная'">
          <el-form-item :error="validationErrors[index]?.password ? 'Поле обязательно' : ''">
            <el-input v-model="account.password" @blur="validateAndSave(index)" type="password" show-password
              placeholder="Пароль" maxlength="10" />
          </el-form-item>
        </el-col>
        <el-col :span="1" v-if="account.type === 'Локальная'">
          <el-button @click="removeAccount(index)" circle>
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </el-col>
        <el-col :span="1" v-else>
          <el-button @click="removeAccount(index)" circle>
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '../../stores';
import { Delete, QuestionFilled } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'AccountForm',
  components: { Delete, QuestionFilled },
  setup() {
    const store = useStore();
    const accounts = ref<any[]>(store.$state.accounts);
    const validationErrors = ref<{ [key: string]: boolean }[]>([]);

    const addAccount = () => {
      accounts.value.push({ rawLabel: '', label: [], type: 'LDAP', login: '', password: null });
      validateAndSave(accounts.value.length - 1);
    };

    const removeAccount = (index: number) => {
      accounts.value.splice(index, 1);
      validationErrors.value.splice(index, 1);
      store.updateAccounts(accounts.value);
    };

    const validateAndSave = (index: number) => {
      const account = accounts.value[index];
      const errors: { [key: string]: boolean } = {};
      if (!account.login) errors['login'] = true;
      if (account.type === 'Локальная' && !account.password) errors['password'] = true;
      validationErrors.value[index] = errors;

      if (Object.keys(errors).length === 0) {
        account.label = account.rawLabel ? account.rawLabel.split(';').map((tag: string) => ({ text: tag.trim() })).filter((tag: { text: string }) => tag.text) : [];
        if (account.type === 'LDAP') account.password = null;
        store.updateAccounts([...accounts.value]);
      }
    };

    watch(accounts, (newAccounts) => {
      store.updateAccounts(newAccounts);
    }, { deep: true });


    return { accounts, addAccount, removeAccount, validateAndSave, validationErrors, form: {} };
  },
});
</script>

<style lang="scss" scoped>
@import './AccountForm.sass';
@import '../../style/global.sass';
</style>