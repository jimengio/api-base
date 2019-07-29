import React from "react";
import { css, cx } from "emotion";
import { immerHelpers, ImmerStateFunc, MergeStateFunc } from "@jimengio/shared-utils";
import { JimuApisEventBus, EJimuApiEvent } from "../event-bus";

interface IProps {}

interface IState {
  progress: number;
  displaying: boolean;
}

export default class NetProgress extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      displaying: false,
    };
  }

  immerState = immerHelpers.immerState as ImmerStateFunc<IState>;
  mergeState = immerHelpers.mergeState as MergeStateFunc<IState>;

  componentDidMount() {
    // connect to API events
    JimuApisEventBus.on(EJimuApiEvent.Inc, this.incrementProgress);
    JimuApisEventBus.on(EJimuApiEvent.Done, this.completeProgress);
  }

  componentWillUnmount() {
    JimuApisEventBus.removeListener(EJimuApiEvent.Inc, this.incrementProgress);
    JimuApisEventBus.removeListener(EJimuApiEvent.Done, this.completeProgress);
  }

  render() {
    return (
      <div
        className={styleContainer}
        style={{
          opacity: this.state.displaying ? 1 : 0,
          width: `${this.state.progress}%`,
        }}
      />
    );
  }

  incrementProgress = () => {
    this.immerState((state) => {
      // console.info("increament", state.progress);
      if (state.displaying) {
        state.progress = state.progress + (100 - state.progress) * 0.382;
      } else {
        state.displaying = true;
        state.progress = 38.2;
      }
    });
  };

  completeProgress = () => {
    // console.info("done");
    this.immerState((state) => {
      state.displaying = false;
      state.progress = 100;
    });

    setTimeout(() => {
      this.immerState((state) => {
        state.displaying = false;
        state.progress = 0;
      });
    }, 400);
  };
}

const styleContainer = css`
  position: fixed;
  left: 0;
  top: 0;
  height: 2px;
  background-color: #2c85dd;

  transition-duration: 400ms;
`;
