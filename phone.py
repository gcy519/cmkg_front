# -*- coding: UTF-8 -*-
def sumSubarrayMins():
        def BFS(arr,a,b,step):
            if a == b:
                return arr.length - step
            if step == 0:
                return -1
            for i in range(arr.length):
                if(arr[a][i]):
			BFS(arr,i,b,step-1)
 
		for index,line in sys.stdin:
			if index == m+1+q+1:
				break
			if index == 0:
				n,m = line.split()
				arr = [[] for i in range(n+1)]
				for i in range (n+1):
					arr[i] = [False for i in range(n+1)]
				for i in range(n+1):
					for j in range(n+1):
						relation[i][j] = False
			if index >=1 and index <= m:
				relation = line.split()
				i = int(relation[0])
				j = int(relation[1])
				arr[i][j] = True
 			if index == m+1:
				q = int(line)
			if index > m+1:
				question = line.split()
 				a = int(question[0])
				b = int(question[1])
				cout<<BFS(relation,a,b,n+1)

if __name__=="__main__":
	sumSubarrayMins()
