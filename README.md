# 1. JS Concurrency Exercise

## 📌 Goal

Given an array of asynchronous functions (e.g. fetch requests), and a maximum concurrency value, the goal is to execute all tasks while limiting how many run in parallel at any one time.

## 📄 Description

This function ensures that no more than `MAX_CONCURRENCY` tasks run concurrently. As soon as one finishes, the next pending task starts. The function returns a list of resolved values in the same order as the input functions.

Useful for:
- Rate limiting
- Avoiding overloading resources
- Throttling parallel requests

## ⚙️ How to Run

You can run it with Node.js:

```bash
node concurrency.js
