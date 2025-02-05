import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BettingBoard() {
  const [bets, setBets] = useState([]);
  const [newBet, setNewBet] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState("");

  const addBet = () => {
    if (newBet && amount && user) {
      setBets([...bets, { bet: newBet, amount, user, won: null }]);
      setNewBet("");
      setAmount("");
      setUser("");
    }
  };

  const markWinner = (index, status) => {
    const updatedBets = [...bets];
    updatedBets[index].won = status;
    setBets(updatedBets);
  };

  const editBet = (index, newBet, newAmount) => {
    const updatedBets = [...bets];
    updatedBets[index].bet = newBet;
    updatedBets[index].amount = newAmount;
    setBets(updatedBets);
  };

  const removeBet = (index) => {
    setBets(bets.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Super Bowl Betting Board</h1>
      <div className="mb-4 space-y-2">
        <Input placeholder="Your Name" value={user} onChange={(e) => setUser(e.target.value)} />
        <Input placeholder="Bet Description" value={newBet} onChange={(e) => setNewBet(e.target.value)} />
        <Input type="number" placeholder="Wager Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Button onClick={addBet}>Place Bet</Button>
      </div>
      <div className="space-y-4">
        {bets.map((bet, index) => (
          <Card key={index} className="p-4">
            <CardContent>
              <p className="font-bold">{bet.user} bet: {bet.bet}</p>
              <p>Amount: ${bet.amount}</p>
              {bet.won === null ? (
                <div className="space-x-2 mt-2">
                  <Button onClick={() => markWinner(index, true)}>Win</Button>
                  <Button onClick={() => markWinner(index, false)}>Lose</Button>
                </div>
              ) : (
                <p className={`font-bold ${bet.won ? "text-green-500" : "text-red-500"}`}>
                  {bet.won ? "Won" : "Lost"}
                </p>
              )}
              <div className="space-x-2 mt-2">
                <Button onClick={() => editBet(index, prompt("Edit Bet", bet.bet) || bet.bet, prompt("Edit Amount", bet.amount) || bet.amount)}>Edit</Button>
                <Button onClick={() => removeBet(index)}>Remove</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}