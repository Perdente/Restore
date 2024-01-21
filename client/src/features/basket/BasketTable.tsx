import { Add, Remove, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Box,
  styled,
} from "@mui/material";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { currencyFormat, calculateSubtotal } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BasketTable = ({ items, isBasket = true }: Props) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Subtotal</StyledTableCell>
            {isBasket && <StyledTableCell align="center"></StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow key={item.productId}>
              <StyledTableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                {currencyFormat(item.price)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {isBasket && (
                  <LoadingButton
                    loading={status === "pendingAddItem" + item?.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="primary"
                  >
                    <Add />
                  </LoadingButton>
                )}

                {item.quantity}

                {isBasket && (
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item?.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {calculateSubtotal(item.price, item.quantity)}
              </StyledTableCell>
              {isBasket && (
                <StyledTableCell align="center">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item?.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasketTable;
