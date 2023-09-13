import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>(); // useParams -> The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    agent.Catalog.details(parseInt(id!))   // https://bobbyhadz.com/blog/typescript-argument-type-undefined-not-assignable-parameter-type-string#use-the-non-null-assertion-operator-to-solve-the-error
      .then((response) => setProduct(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingComponent message="Loading Item..."/>;
  if (!product) return <NotFound/>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureURL}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell> Name </TableCell>
                <TableCell> {product.name} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Description </TableCell>
                <TableCell> {product.description} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Type </TableCell>
                <TableCell> {product.type} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Brand </TableCell>
                <TableCell> {product.brand} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Quantity in stock </TableCell>
                <TableCell> {product.quantityInStock} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
