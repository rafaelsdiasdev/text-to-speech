const Comments = require("../models/Comments");

require("dotenv").config();

const fs = require("fs");

getStat = require("util").promisify(fs.stat);

const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  url: process.env.URL,
});

module.exports = {
  async audio(req, res) {
    const { comment_id } = req.params;
    const comments = await Comments.findByPk(comment_id);

    const filePath = `audio/${comments.dataValues.name_archive}.ogg`;
    const stat = await getStat(filePath);

    res.writeHead(200, {
      "Content-Type": "audio/ogg",
      "Content-Length": stat.size,
    });

    const stream = fs.createReadStream(filePath);

    stream.on("end", () => console.log("acabou"));
    stream.pipe(res);

    return res.json(comments);
  },

  async index(req, res) {
    const comments = await Comments.findAll();

    return res.json(comments);
  },

  async store(req, res) {
    const { text, name_archive } = req.body;
    const voice = "pt-BR_IsabelaV3Voice";
    const accept = "audio/wav";
    await textToSpeech
      .synthesize({ text, voice, accept })
      .then((response) => {
        "";
        const audio = response.result;
        return textToSpeech.repairWavHeaderStream(audio);
      })
      .then((repairedFile) => {
        fs.writeFileSync(`audio/${name_archive}.ogg`, repairedFile);
      })
      .catch((err) => {
        console.log(err);
      });

    const comments = await Comments.create({
      text,
      voice,
      accept,
      name_archive,
    });

    return res.json(comments);
  },
};
