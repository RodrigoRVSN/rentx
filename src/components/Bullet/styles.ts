import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 8px;
  height: 8px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
  margin-left: 6px;
  border-radius: 3px;
`;
