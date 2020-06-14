<template>
  <el-row v-loading="loading" :data="comments">
    <el-col class="comment" :span="12">
      <el-form id="form" action>
        <h2>Comentário</h2>
        <el-input
          id="comment"
          name="comment"
          v-model="text"
          type="textarea"
          placeholder="Digite um comentário"
          :rows="8"
        ></el-input>
        <el-button
          style="width: 100%; margin-top: 20px"
          type="primary"
          round
          plain
          :disabled="text === ''"
          @click.prevent="sendComment"
        >Cadastrar</el-button>
        <p class="emptyInput" v-show="text === ''">
          <strong>{{ emptyInput }}</strong>
        </p>
      </el-form>
    </el-col>
    <el-col class="comments" :span="12">
      <h2>Comentários</h2>
      <div v-if="comments.length === 0">
        <p>Nenhum comentário</p>
      </div>
      <div v-else class="comments-container" v-for="comment in comments" :key="comment.id">
        <div class="comments-row">
          <div class="comments-text">
            <p>{{ comment.text }}</p>
          </div>
          <div>
            <audio :id="comment.id" :src="`http://localhost:3333/audio/${comment.id}`"></audio>
            <el-button @click="getAudio(comment.id)">Ouvir</el-button>
          </div>
        </div>

        <el-divider></el-divider>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Notification,
  Divider
} from "element-ui";
export default {
  name: "Comments",
  components: {
    [Divider.name]: Divider,
    [Row.name]: Row,
    [Col.name]: Col,
    [Form.name]: Form,
    [Input.name]: Input,
    [Button.name]: Button,
    [Notification.name]: Notification
  },
  data() {
    return {
      comments: [],
      text: "",
      emptyInput: "* Por favor, digite algum comentário.",
      loading: true
    };
  },
  mounted() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const res = await axios.get("http://localhost:3333/comments");

        return (this.comments = res.data);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    nofifySuccess() {
      Notification.success({
        message: "Comentário cadastrado com sucesso",
        type: "success"
      });
    },

    nofifyFail() {
      Notification.error({
        message: "Falha ao cadastrar o comentário"
      });
    },

    async sendComment() {
      this.loading = true;
      try {
        if (this.text !== "") {
          const res = await axios.post("http://localhost:3333/comments", {
            text: this.text,
            name_archive: uuidv4()
          });
          this.nofifySuccess();
          return res;
        }
      } catch (err) {
        console.error(err);
        this.nofifyFail();
      } finally {
        this.fetchComments();
        this.loading = false;
        this.text = "";
      }
    },
    getAudio(id) {
      const audio = document.getElementById(id);
      return audio.play();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  margin: 0;
}

.comment {
  padding: 0 50px;
}

.comments {
  padding: 0 50px;
  border-left: 1px solid #000;
  height: 83.5vh;
  margin-bottom: 50px;
}

.comments-container {
  display: flex;
  flex-direction: column;
}

.comments-row {
  display: flex;
}

.comments-text {
  display: flex;
  width: 100%;
  align-items: center;
}

.emptyInput {
  margin-top: 20px;
}
</style>
