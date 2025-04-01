import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import { BarChart } from '@mantine/charts';
import { MantineProvider, Select, Grid, Container } from "@mantine/core";
import { theme } from "./theme";
import { AreaChart } from '@mantine/charts';
import { data } from './data';
import { lose } from './lose';



export default function App() {
  return <>
    <Container size="xl" >    
         <Select
            label="Направление"
            placeholder="Pick value"
            data={['Помощь животным', 'Помощь старикам', 'Садоводство', 'Медицина']} 
            w={400} 
            />
        
        <AreaChart
          h={300}
          data={data}
          dataKey="date"
          series={[{ name: 'Apples', color: 'indigo.6' }]}
          curveType="linear"
          connectNulls
        />
        <Grid>
          <Grid.Col span={4}>
              <BarChart
                  h={200}
                  data={lose}
                  dataKey="month"
                  orientation="vertical"
                  yAxisProps={{ width: 80 }}
                  barProps={{ radius: 10 }}
                  series={[{ name: 'Smartphones', color: 'blue.6' }]}
                />
          </Grid.Col>
          <Grid.Col span={4}>
              <BarChart
                  h={200}
                  data={lose}
                  dataKey="month"
                  orientation="vertical"
                  yAxisProps={{ width: 80 }}
                  barProps={{ radius: 10 }}
                  series={[{ name: 'Smartphones', color: 'blue.6' }]}
                />
          </Grid.Col>  
        </Grid>
        </Container> 
          
  </>
}
