import styled from "styled-components";

const Wrapper = styled.div`
  display: ${props => (props.displayBlock ? "block" : "inline-block")};

  .hitWrapper {
    position: relative;

    .hit {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export default Wrapper;
