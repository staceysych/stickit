import React from "react";
import Draggable, {
  ControlPosition,
  DraggableEventHandler,
} from "react-draggable";

interface DraggableComponentProps {
  children: React.ReactNode;
  onStop: DraggableEventHandler;
  position: ControlPosition;
  handle: string,
}

const DraggableComponent = ({
  children,
  onStop,
  position = {
    x: 0,
    y: 0,
  },
  handle,
}: DraggableComponentProps) => {
  return (
    <Draggable position={position} onStop={onStop} handle={handle}>
      {children}
    </Draggable>
  );
};

export default DraggableComponent;
