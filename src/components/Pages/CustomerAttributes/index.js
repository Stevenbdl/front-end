import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { AttributeTable } from "./components/AttributeTable/AttributeTable";
import { EventTable } from "./components/EventTable/EventTable";
import { isEqual } from 'lodash';
import { getCustomerById, updateCustomerAttributesById } from "../../Services";
import { useParams } from "react-router-dom";

export const CustomerAttributes = () => {
  const [customer, setCustomer] = useState({
    email: '',
    last_updated: '',
    attributes: {
      loaded: [],
      state: []
    },
    events: []
  });
  const [action, setAction] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchCustomerById = async () => {
      const { data } = await getCustomerById(params.id);
      const attributes_fetched = [{ name: 'id', value: data.customer.id, can_be_modified: false }];

      for (let attr in data.customer.attributes) {
        attributes_fetched.push({
          name: attr,
          value: data.customer.attributes[attr],
          can_be_modified: !isEqual(attr, 'email')
        });
      }

      const events_fetched = [];
      for (let event in data.customer.events) {
        events_fetched.push({
          event_name: event,
          count: data.customer.events[event]
        });
      }
      setCustomer({
        ...customer,
        id: data.customer.id,
        email: data.customer.attributes.email,
        last_updated: new Date(data.customer.last_updated).toString(),
        attributes: {
          loaded: attributes_fetched,
          state: attributes_fetched
        },
        events: events_fetched
      });

      setAction(false);
    }
    if(action) fetchCustomerById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, action]);

  const handleSave = async () => {
    let attributesJson = {};
    for (let attr of customer.attributes.state) {
      if(attr.name !== 'id') attributesJson[attr.name] = attr.value;
    }
    await updateCustomerAttributesById(customer.id, {
      customer: {
        attributes: attributesJson
      }
    });
    setAction(true);
  }
  return (
    <Paper>
      <Box sx={{
        padding: 2
      }}>
        <Grid
          container
          direction="column"
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <h1>{customer.email}</h1>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="inherit">
              {customer.last_updated}
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <AttributeTable
                customer={customer}
                setCustomer={setCustomer}
              />
            </Grid>

            <Grid item>
              <EventTable
                customer={customer}
              />
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ paddingTop: 1 }}>
              <Grid item>
                <Button
                  disabled={isEqual(customer.attributes.loaded, customer.attributes.state)}
                  onClick={handleSave}
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}