#include <iostream>

using namespace std;


int minmult(int n, int d[], int P[][n]) {
  int i, j, k, diagonal;
  int M[n][n];

  for (i = 0; i < n; i++)
    for (k = 0; k < n; k++)
      M[i][k] = 0;

  for (diagonal = 1; diagonal <= n - 1; diagonal++)
    for (i = 0; i < n - diagonal; i++) {
      j = i + diagonal;
        
      for (k = i; k < j; k++) {
        if (k == i) {
          M[i][j] = M[i][k] + M[k + 1][j] + d[i]*d[k + 1]*d[j + 1];
          P[i][j] = k;
        } else {
          if (M[i][j] > M[i][k] + M[k + 1][j] + d[i]*d[k + 1]*d[j + 1]) {
            M[i][j] = M[i][k] + M[k + 1][j] + d[i]*d[k + 1]*d[j + 1];
            P[i][j] = k;
          }
        }
      }
    }
  return M[0][n - 1];
}

void order(int i, int j) {
  if (i == j)
    printf("A%d", i + 1);
  else {
    int k = P[i][j];
    printf("(");
    order(i, k);
    order(k + 1, j);
    printf(")");
  }
}

int main() {
  int n;
  int P[n][n] = { 0, };

}