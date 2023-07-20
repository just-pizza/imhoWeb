<template>
  <div > 
    
    <h1>게시판 등록</h1>

      <div class="add-wrap">
        <form>
          <div class="form-group">
            <label for="subject">제목</label>
            <input type="text" id="subject" v-model="subject" ref="subject" />
            <!-- <el-form-item label="Activity name">
             <el-input v-model="form.name"></el-input>
            </el-form-item> -->
          </div>
          <div class="form-group">
            <label for="cont">내용</label>
            <textarea id="cont" v-model="cont" ref="cont"></textarea>
          </div>
        </form>
      </div>

      <div class="btn-wrap">
        <button class="btn btn-add" >등록</button>
      </div>
  </div>
</template>

<script>
import Form from '~/components/Form.vue';
import PostItem from './PostItem.vue';

export default {
  props: {
    // visible: {
    //   type: Boolean,
    //   default: false
    // },
  },
  // components: {
  //   PostItem,
  // },
  data(){
    return {
      cont:'',
      subject:''
      
    }
  }
  
};
</script>