import http from "./http";

const ParserService = {
  parse: (payload) => http.post("/parser/parse", payload),
};

export default ParserService;
