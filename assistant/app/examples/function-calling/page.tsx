"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import {
  getSingleConnection,
  recordConnection,
  searchConnections,
  sendMessage,
} from "../../utils";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

const functionCalls = {
  recordConnection: recordConnection,
  getSingleConnection: getSingleConnection,
  searchConnections: searchConnections,
  sendMessage: sendMessage,
};

const FunctionCalling = () => {
  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    console.log(call);
    if (!Object.keys(functionCalls).includes(call?.function?.name)) return;
    console.log(call);
    const args = JSON.parse(call.function.arguments);
    const handler = functionCalls[call?.function?.name];
    if (!handler) return;
    const data = handler(args);
    return JSON.stringify(data);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div>Placeholder output</div>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
