import mitt from "mitt";

type Events = {
  showScratch: void;
};

const emitter = mitt<Events>();

export default emitter;
