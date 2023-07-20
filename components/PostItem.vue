<template>
  <li>
    <strong>{{ post.title }} </strong>
    <p>작성자 : {{ post.id }}</p>
  </li>
</template>

<script>
export default {
  props: {
    post: Object, // 개별 게시물 객체를 받아옴
  },
};
</script>