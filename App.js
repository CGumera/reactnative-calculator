/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {
  constructor() { 
    super();
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.ops = ['DEL', '*', '/', '+', '-']
    this.nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']]
    this.buttonPressed.bind(this)
    this.operate.bind(this)
  }

  buttonPressed(text) {
    let resultText = this.state.resultText
    const lastChar = resultText.charAt(resultText.length - 1)
    switch(text) {
      case "=":
        this.setState({
          calculationText: eval(resultText)
        })
        break
      case 0:
      case ".":
        if ((text == "." && lastChar == ".") 
          || (text == "0" && lastChar == "0" && resultText.length == 1)) return

        this.setState({
          resultText: resultText + text
        })
        break
      default:
        if(lastChar == "0" && resultText.length == 1) {
          resultText = ""
        }
        this.setState({
          resultText: resultText + text
        })
        break
    }
  }

  operate(operation) {
    switch(operation) {
      case 'DEL':
        this.setState({
          resultText: this.state.resultText.slice(0, -1)
        })
        break
      case '*':
      case '/':
      case '+':
      case '-':
        const resultText = this.state.resultText
        const lastChar = resultText.charAt(resultText.length - 1)
        if(this.state.resultText == "") return
        
        if(this.ops.indexOf(lastChar) > 0) {
          this.setState({
            resultText: resultText.slice(0, -1) + operation
          })
        } else {
          this.setState({
            resultText: resultText + operation
          })
        }
        break
    }
  }

  render() {
    let numbers = []
    for(let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={this.nums[i][j]} style={styles.btn}
            onPress={() => this.buttonPressed(this.nums[i][j])}>
            <Text style={styles.numbersText}>{this.nums[i][j]}</Text>
          </TouchableOpacity>)
      }
      numbers.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let operations = []
    for(let i = 0; i < this.ops.length; i++) {
      operations.push(<TouchableOpacity key={this.ops[i]} style={styles.btn}
          onPress={() => this.operate(this.ops[i])}>
        <Text style={styles.operationsText}>{this.ops[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.resultText}
          </Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {numbers}
          </View>
          <View style={styles.operations}>
            {operations}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  resultText: {
    fontSize: 50,
    color: 'black'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculationText: {
    fontSize: 50,
    color: 'black'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#636363'
  },
  numbersText: {
    fontSize: 30,
    color: 'white',
    padding: 40
  },
  operations: {
    flex: 1,
    backgroundColor: '#444444',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  operationsText: {
    fontSize: 30,
    color: 'white',
    padding: 10
  }
});
