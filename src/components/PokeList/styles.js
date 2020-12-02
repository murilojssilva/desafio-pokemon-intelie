import styled from "styled-components";

export const Container = styled.div``;


export const Close = styled.button`
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    float: right;
`
export const PTable = styled.table`
  max-width: 165px;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  th {
    padding: 10px;
    background: #bcbcbc;
    text-align: left;
  }
  tbody {
    width: 100%;
    tr {
      text-align: left;
      border-bottom: 1px solid #bcbcbc;
      line-height: 15px;
      td {
        padding: 10px;
        text-align: left;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  min-width: 500px;
  max-width: 900px;
  margin-top: 10px;
`;

export const PaginationButton = styled.div`
  display: flex;
`;

export const PaginationItem = styled.div`
  margin: 0 10px;
  cursor: pointer;
  ${(props) =>
    props.isSelect && {
      background: "#6d6d6d",
      padding: "0 5px",
    }}
`;