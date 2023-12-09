import React from "react";
import Draggable, {
  ControlPosition,
  DraggableEventHandler,
} from "react-draggable";

interface DraggableComponentProps {
  children: React.ReactNode;
  onStop: DraggableEventHandler;
  position: ControlPosition;
}

const DraggableComponent = ({
  children,
  onStop,
  position = {
    x: 0,
    y: 0,
  },
}: DraggableComponentProps) => {
  return (
    <Draggable position={position} onStop={onStop}>
      {children}
    </Draggable>
  );
};

export default DraggableComponent;
