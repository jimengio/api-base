import React from "react";
import { css, cx } from "emotion";
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
    // console.info("increament", state.progress);
    if (this.state.displaying) {
      this.setState({
        ...this.state,
        progress: this.state.progress + (100 - this.state.progress) * 0.382,
      });
    } else {
      this.setState({
        displaying: true,
        progress: 38.2,
      });
    }
  };

  completeProgress = () => {
    // console.info("done");
    this.setState({
      displaying: false,
      progress: 100,
    });

    setTimeout(() => {
      this.setState({
        displaying: false,
        progress: 0,
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
