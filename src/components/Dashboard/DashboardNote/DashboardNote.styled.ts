import styled from "styled-components";
import { colorPalette } from "../../../utils/colors";

interface NoteColorBadge {
  background: string;
}

export const NoteContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

export const DateBlock = styled.div`
  font-size: 14px;
  align-self: flex-end;
  justify-self: flex-end;
`;

export const NoteColorBadge = styled.div<NoteColorBadge>`
  align-self: baseline;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) =>
    colorPalette[props.background].main} !important;
`;

export const NoteBody = styled.div`
  width: 95%;
  font-size: 16px;
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
