<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from 'vue'
import {
  articleCategoryAddService, articleCategoryDeleteService,
  articleCategoryListService, articleCategoryUpdateService

} from "@/api/article.js";
import router from "@/router/index.js";
import {ElMessage, ElMessageBox} from "element-plus";
const title=ref('')
let categories = ref([
  {
    "id": 3,
    "categoryName": "美食",
    "categoryAlias": "my",
    "createTime": "2023-09-02 12:06:59",
    "updateTime": "2023-09-02 12:06:59"
  },
  {
    "id": 4,
    "categoryName": "娱乐",
    "categoryAlias": "yl",
    "createTime": "2023-09-02 12:08:16",
    "updateTime": "2023-09-02 12:08:16"
  },
  {
    "id": 5,
    "categoryName": "军事",
    "categoryAlias": "js",
    "createTime": "2023-09-02 12:08:33",
    "updateTime": "2023-09-02 12:08:33"
  }
])
// 声明一个异步函数
const articleCategory = async () => {
  console.log("articleCategory");
   try {let result = await articleCategoryListService();
     console.log(result);
     categories.value = result.data;
   } catch (e){
     console.log(e);
     await router.push('/login')
   }
}
articleCategory();
//控制添加分类弹窗
const dialogVisible = ref(false)
//添加分类数据模型
const categoryModel = ref({
  categoryName: '',
  categoryAlias: ''
})
//添加分类表单校验
const rules = {
  categoryName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
  categoryAlias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
  ]
}
const addCategory  = async  () => {
  console.log("addCategory");
  let result = await articleCategoryAddService(categoryModel.value);
  ElMessage.success(result.message? result.message:'添加成功')
  //隐藏弹窗
  dialogVisible.value = false
  //再次访问后台接口，查询所有分类
  await articleCategory()
}
const updateCategory  = async  () => {
  console.log("updateCategory");
  let result = await articleCategoryUpdateService(categoryModel.value);
  ElMessage.success(result.message? result.message:'修改成功')
  //隐藏弹窗
  dialogVisible.value = false
  //再次访问后台接口，查询所有分类
  await articleCategory()
}

//删除分类
const deleteCategory = (row) => {
  ElMessageBox.confirm(
      '你确认删除该分类信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        let result = await articleCategoryDeleteService(row.id)
        ElMessage.success(result.message?result.message:'删除成功')
        //再次调用getAllCategory，获取所有文章分类
        await articleCategory()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}
//展示编辑弹窗 row接受点击的数据 在@click后面的方法的括号里加row row会被自动解构获取数值
const showDialog = (row)=>{
  dialogVisible.value=true
  title.value='编辑分类'
  //数据拷贝
  categoryModel.value.categoryName = row.categoryName
  categoryModel.value.categoryAlias = row.categoryAlias
  //扩展一个id，将来传递给后台完成分类修改
  categoryModel.value.id = row.id
}
//清空模型数据
const clearCategoryModel = ()=>{
  categoryModel.value.categoryName='',
      categoryModel.value.categoryAlias=''
}

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>文章分类</span>
        <div class="extra">
          <el-button type="primary" @click="dialogVisible = true;title='添加分类'">添加分类</el-button>
        </div>
      </div>

    </template>
    <el-table :data="categories" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="categoryName"></el-table-column>
      <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row),clearCategoryModel()"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>
  <!-- 添加分类弹窗  复用-->
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="categoryAlias">
        <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
       <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="title==='添加分类'? addCategory():updateCategory()"> 确认 </el-button>
            </span>
    </template>
  </el-dialog>

</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>