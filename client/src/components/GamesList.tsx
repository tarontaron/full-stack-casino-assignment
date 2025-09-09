import { Button, Card, Flex, Typography } from 'antd';
import useGetGamesQuery from '../services/queries/useGetGamesQuery';
import useDoBetMutation from '../services/queries/useDoBetMutation';

const GamesList = () => {
  const { data } = useGetGamesQuery();

  const { mutate } = useDoBetMutation();

  const onBet = (game_id: number) => {
    mutate({
      game_id,
      amount: 25,
    })
  };

  return (
    <Flex gap={12}>
      {data?.map(({ id, name }) => (
        <Card key={id} title={name} style={{ width: '100%' }}>
          <Typography>Bet Amount: 25$</Typography>
          <Button type="primary" style={{ marginTop: 12 }} onClick={() => onBet(id)}>Bet</Button>
        </Card>
      ))}
    </Flex>
  );
};

export default GamesList;
